import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, finalize, of, pipe, take } from 'rxjs';
import { IComputerMemory } from 'src/app/core/components/computer/model/computer-memory';
import { ComputerService } from 'src/app/core/components/computer/services/computer.service';
import { IAbstractAutocomplete } from 'src/app/core/shared/abstracts/interface/abstract-autocomplete';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  selector: 'app-computer-memory-autocomplete',
  templateUrl: './computer-memory-autocomplete.component.html',
  styleUrls: ['./computer-memory-autocomplete.component.css']
})
export class ComputerMemoryAutocompleteComponent implements OnInit, IAbstractAutocomplete<IComputerMemory> {

  messages = TranslateMessages;
  @Input() control!: FormControl;
  register!: IComputerMemory;
  items!: Observable<IComputerMemory[]>;
  loading: boolean = false;
  @Input() id: string = "";
  @Output() onSelect: EventEmitter<IComputerMemory | null> = new EventEmitter();

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
      this.items = this.service.getComputerMemoryAutoComplete(this.service.removeNonAlfaNumericCharacters(filter));
      pipe(finalize(() => this.loading = false))
    } else {
      this.items = of([]).pipe(take(1));
    }
  }

  displayWith(memory: IComputerMemory): string {
    return memory ? `${memory.id} - ${memory.brandName} ${memory.type} ${memory.size}GB` : '';
  }

}
