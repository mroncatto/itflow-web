import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IOccupationFilter } from 'src/app/core/components/staff/filter/occupation-filter';
import { Occupation } from 'src/app/core/components/staff/model/occupation';
import { StaffService } from 'src/app/core/components/staff/services/staff.service';
import { AbstractFilter } from '../../../abstracts/abstract-filter';
import { IAbstractCheckboxFilter } from '../../../abstracts/interface/abstract-checkbox-filter';

@Component({
  selector: 'app-occupation-checkbox-filter',
  templateUrl: './occupation-checkbox-filter.component.html',
  styleUrls: ['./occupation-checkbox-filter.component.css']
})
export class OccupationCheckboxFilterComponent extends AbstractFilter<Occupation> implements OnInit, OnDestroy, IAbstractCheckboxFilter<Occupation> {

  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  constructor(private service: StaffService) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  loadData(): void {  
    if (this.records.length > 0) return;
    this.loading = true;
    this.clearData();
    this.sub.push(
      this.service.getOccupationUsingByStaff().subscribe({
        next: (data) => this.onSuccess(data),
        error: (err) => this.loading = false
      })
    );
  }

  onSuccess(data: Occupation[]): void {
    this.loading = false;
    this.records = data;
    this.itemList = [];
    data.forEach(occupation => {
      this.itemList.push({ id: occupation.id, name: occupation.name, checked: false });
    });
  }

  onChange(item: IOccupationFilter, filtering: boolean = false): void {
    if(filtering){
      this.itemList.forEach(d => {
        if (d.id == item.id) d.checked = item.checked;
      })
    }
    this.onSelect.emit(this.itemList.filter(d => d.checked));
  }

  clearSelection(): void {
    if (this.countSelectedItems() > 0 || this.filterInput.length > 0) {
      this.itemList.forEach(f => f.checked = false);
      this.filterInput = "";
      this.filteredItemList = [];
      this.onSelect.emit([]);
    }
  }

  refershList(): void {
    this.clearSelection();
    this.records = [];
    this.loadData();
  }

}
