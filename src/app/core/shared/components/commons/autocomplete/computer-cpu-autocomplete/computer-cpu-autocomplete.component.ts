import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatLegacyAutocompleteSelectedEvent as MatAutocompleteSelectedEvent } from '@angular/material/legacy-autocomplete';
import { Observable, finalize, map, of, pipe, take } from 'rxjs';
import { IComputerCpu } from 'src/app/core/components/computer/model/computer-cpu';
import { ComputerService } from 'src/app/core/components/computer/services/computer.service';
import { IAbstractAutocomplete } from 'src/app/core/shared/abstracts/interface/abstract-autocomplete';

@Component({
  selector: 'app-computer-cpu-autocomplete',
  templateUrl: './computer-cpu-autocomplete.component.html',
  styleUrls: ['./computer-cpu-autocomplete.component.css']
})
export class ComputerCpuAutocompleteComponent implements OnInit, IAbstractAutocomplete<IComputerCpu> {

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
  }

  search(): void {
    const filter = this.control.value
    if (filter) {
      this.loading = true;
      this.items = this.service.getComputerCpuAutoComplete(filter);
      pipe(finalize(() => this.loading = false))
    } else {
      this.items = of([]).pipe(take(1));
    }
  }

  displayWith(cpu: IComputerCpu): string {
    return cpu ? `${cpu.id} - ${cpu.brandName} ${cpu.model} ${cpu.frequency} ${cpu.socket}` : '';
  }

}
