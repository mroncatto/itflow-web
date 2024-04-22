import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, finalize, of, pipe, take } from 'rxjs';
import { ComputerService } from 'src/app/core/components/computer/services/computer.service';
import { IDeviceComputer } from 'src/app/core/components/device/model/device-computer';
import { IAbstractAutocomplete } from 'src/app/core/shared/abstracts/interface/abstract-autocomplete';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  selector: 'app-device-computer-autocomplete',
  templateUrl: './device-computer-autocomplete.component.html',
  styleUrls: ['./device-computer-autocomplete.component.css']
})
export class DeviceComputerAutocompleteComponent implements OnInit, IAbstractAutocomplete<IDeviceComputer>  {

  messages = TranslateMessages;
  @Input() control!: FormControl;
  register!: IDeviceComputer;
  items!: Observable<IDeviceComputer[]>;
  loading: boolean = false;
  @Input() id: string = "";
  @Output() onSelect: EventEmitter<IDeviceComputer | null> = new EventEmitter();


  constructor(private service: ComputerService) { }

  ngOnInit(): void {
    this.control.valueChanges.forEach(input => {
      if (typeof input === 'string')
        this.search();

      if (input?.length === 0 && this.onSelect)
        this.onSelect.emit(null);
    })
  }

  onSelectItem(event: MatAutocompleteSelectedEvent): void {
    this.register = event.option.value;
    this.onSelect.emit(this.register);
    this.items = of([]);
  }

  search(): void {
    const filter = this.control.value
    if (filter) {
      this.loading = true;
      this.items = this.service.getDeviceComputerAutoComplete(this.service.removeNonAlfaNumericCharacters(filter));
      pipe(finalize(() => this.loading = false))
    } else {
      this.items = of([]).pipe(take(1));
    }
  }

  displayWith(computer: IDeviceComputer): string {
    let desc: string = computer ? `${computer.id} - ${computer.device.hostname}` : '';
    return desc;
  }
}
