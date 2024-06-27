import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, finalize, of, pipe, take } from 'rxjs';
import { IComputerSoftware } from 'src/app/core/components/computer/model/computer-software';
import { ComputerService } from 'src/app/core/components/computer/services/computer.service';
import { IAbstractAutocomplete } from 'src/app/core/shared/abstracts/interface/abstract-autocomplete';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  selector: 'app-computer-software-autocomplete',
  templateUrl: './computer-software-autocomplete.component.html',
  styleUrls: ['./computer-software-autocomplete.component.css']
})
export class ComputerSoftwareAutocompleteComponent implements OnInit, IAbstractAutocomplete<IComputerSoftware> {

  messages = TranslateMessages;
  @Input() control!: FormControl;
  register!: IComputerSoftware;
  items!: Observable<IComputerSoftware[]>;
  loading: boolean = false;
  @Input() id: string = "";
  @Output() onSelect: EventEmitter<IComputerSoftware | null> = new EventEmitter();


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
      this.items = this.service.getComputerSoftwareAutoComplete(this.service.removeNonAlfaNumericCharacters(filter));
      pipe(finalize(() => this.loading = false))
    } else {
      this.items = of([]).pipe(take(1));
    }
  }

  displayWith(software: IComputerSoftware): string {
    let desc: string = software ? `${software.id} - ${software.name}` : '';
    if (software?.developer) desc += ` [ ${software.developer} ]`;
    return desc;
  }

}
