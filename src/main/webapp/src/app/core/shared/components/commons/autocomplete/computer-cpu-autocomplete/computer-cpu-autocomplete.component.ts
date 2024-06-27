import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, finalize, of, pipe, take } from 'rxjs';
import { IComputerCpu } from 'src/app/core/components/computer/model/computer-cpu';
import { ComputerService } from 'src/app/core/components/computer/services/computer.service';
import { IAbstractAutocomplete } from 'src/app/core/shared/abstracts/interface/abstract-autocomplete';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  selector: 'app-computer-cpu-autocomplete',
  templateUrl: './computer-cpu-autocomplete.component.html',
  styleUrls: ['./computer-cpu-autocomplete.component.css']
})
export class ComputerCpuAutocompleteComponent implements OnInit, IAbstractAutocomplete<IComputerCpu> {

  messages = TranslateMessages;
  @Input() control!: FormControl;
  register!: IComputerCpu;
  items!: Observable<IComputerCpu[]>;
  loading: boolean = false;
  @Input() id: string = "";
  @Output() onSelect: EventEmitter<IComputerCpu | null> = new EventEmitter();

  constructor(private service: ComputerService) { }

  ngOnInit(): void {
    this.control.valueChanges.forEach(input => {
      if (typeof input === 'string')
        this.search();

      if(input?.length === 0 && this.onSelect)
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
      this.items = this.service.getComputerCpuAutoComplete(this.service.removeNonAlfaNumericCharacters(filter));
      pipe(finalize(() => this.loading = false))
    } else {
      this.items = of([]).pipe(take(1));
    }
  }

  displayWith(cpu: IComputerCpu): string {
    return cpu ? `${cpu.id} - ${cpu.brandName} ${cpu.model} ${cpu.frequency} ${cpu.socket}` : '';
  }

}
