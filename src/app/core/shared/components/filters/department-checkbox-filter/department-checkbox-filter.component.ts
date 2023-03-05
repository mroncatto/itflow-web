import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IDepartment } from 'src/app/core/components/company/model/department';
import { CompanyService } from 'src/app/core/components/company/services/company.service';
import { AbstractComponent } from '../../../abstracts/abstract-component';
import { ICheckboxFilter } from '../../../abstracts/interface/checkbox-filter';
import { ICheckboxFilterImpl } from '../../../abstracts/interface/checkbox-filter-implement';
import { CheckboxFilterComponent } from '../checkbox-filter/checkbox-filter.component';

@Component({
  selector: 'app-department-checkbox-filter',
  templateUrl: './department-checkbox-filter.component.html',
  styleUrls: ['./department-checkbox-filter.component.css']
})
export class DepartmentCheckboxFilterComponent extends AbstractComponent implements OnInit, OnDestroy, ICheckboxFilterImpl<IDepartment> {

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @ViewChild(CheckboxFilterComponent) checkboxFilter!: CheckboxFilterComponent;

  records: IDepartment[] = [];
  itemList: ICheckboxFilter[] = [];

  constructor(private service: CompanyService) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  select(items: ICheckboxFilter[]): void {
    this.onSelect.emit(items);
  }

  clearSelection(): void {
    this.checkboxFilter.clearSelection();
  }

  load(): void {
    if (this.records.length > 0) return;
    this.loading = true;
    this.sub.push(
      this.service.getDepartmentsUsingByStaff().subscribe({
        next: (data) => this.onSuccess(data)
      })
    )
  }

  onSuccess(data: IDepartment[]): void {
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

}