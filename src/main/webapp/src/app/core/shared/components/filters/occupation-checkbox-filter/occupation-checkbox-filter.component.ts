import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IOccupation } from 'src/app/core/components/staff/model/occupation';
import { StaffService } from 'src/app/core/components/staff/services/staff.service';
import { AbstractComponent } from '../../../abstracts/abstract-component';
import { ICheckboxFilter } from '../../../abstracts/interface/checkbox-filter';
import { ICheckboxFilterImpl } from '../../../abstracts/interface/checkbox-filter-implement';
import { CheckboxFilterComponent } from '../checkbox-filter/checkbox-filter.component';

@Component({
  selector: 'app-occupation-checkbox-filter',
  templateUrl: './occupation-checkbox-filter.component.html',
  styleUrls: ['./occupation-checkbox-filter.component.css']
})
export class OccupationCheckboxFilterComponent extends AbstractComponent implements OnInit, OnDestroy, ICheckboxFilterImpl<IOccupation> {

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @ViewChild(CheckboxFilterComponent) checkboxFilter!: CheckboxFilterComponent;

  records: IOccupation[] = [];
  itemList: ICheckboxFilter[] = [];

  constructor(private service: StaffService) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  select(items: ICheckboxFilter[]): void {
    this.onSelect.emit(items);
  }

  load(): void {
    if (this.records.length > 0) return;
    this.loading = true;
    this.sub.push(
      this.service.getOccupationUsingByStaff().subscribe({
        next: (data) => this.onSuccess(data)
      })
    )
  }
  
  onSuccess(data: IOccupation[]): void {
    this.records = data;
    data.forEach(data => {
      this.itemList.push({ id: data.id, name: data.name, checked: false });
    });
  }

  refresh(): void {
    this.clearSelection();
    this.records = [];
    this.itemList = [];
    this.load();
  }

  clearSelection(): void {
    this.checkboxFilter.clearSelection();
  }

}
