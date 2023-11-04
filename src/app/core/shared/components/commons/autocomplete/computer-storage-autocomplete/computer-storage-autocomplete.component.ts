import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, finalize, of, pipe, take } from 'rxjs';
import { IComputerStorage } from 'src/app/core/components/computer/model/computer-storage';
import { ComputerService } from 'src/app/core/components/computer/services/computer.service';
import { IAbstractAutocomplete } from 'src/app/core/shared/abstracts/interface/abstract-autocomplete';

@Component({
  selector: 'app-computer-storage-autocomplete',
  templateUrl: './computer-storage-autocomplete.component.html',
  styleUrls: ['./computer-storage-autocomplete.component.css']
})
export class ComputerStorageAutocompleteComponent implements OnInit, IAbstractAutocomplete<IComputerStorage> {

  @Input() control!: FormControl;
  register!: IComputerStorage;
  items!: Observable<IComputerStorage[]>;
  loading: boolean = false;
  @Input() id: string = "";
  @Output() onSelect: EventEmitter<IComputerStorage | null> = new EventEmitter();

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
      this.items = this.service.getComputerStorageAutoComplete(this.service.removeNonAlfaNumericCharacters(filter));
      pipe(finalize(() => this.loading = false))
    } else {
      this.items = of([]).pipe(take(1));
    }
  }

  displayWith(storage: IComputerStorage): string {
    return storage ? `${storage.id} - ${storage.brandName} ${storage.type}` : '';
  }


}
