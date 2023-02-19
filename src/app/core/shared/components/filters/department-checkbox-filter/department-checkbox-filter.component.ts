import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IDepartmentFilter } from 'src/app/core/components/company/filter/department-filter';
import { Department } from 'src/app/core/components/company/model/department';
import { CompanyService } from 'src/app/core/components/company/services/company.service';
import { AbstractFilter } from '../../../abstracts/abstract-filter';
import { IAbstractCheckboxFilter } from '../../../abstracts/interface/abstract-checkbox-filter';

@Component({
  selector: 'app-department-checkbox-filter',
  templateUrl: './department-checkbox-filter.component.html',
  styleUrls: ['./department-checkbox-filter.component.css']
})
export class DepartmentCheckboxFilterComponent extends AbstractFilter<Department> implements OnInit, OnDestroy, IAbstractCheckboxFilter<Department> {

  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  constructor(private service: CompanyService) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  loadData(): void {
    if (this.records.length > 0) return;
    this.loading = true;
    this.clearData();
    this.sub.push(
      this.service.getDepartmentsUsingByStaff().subscribe({
        next: (data) => this.onSuccess(data),
        error: (err) => this.loading = false
      })
    );
  }

  onSuccess(data: Department[]): void {
    this.loading = false;
    this.records = data;
    this.itemList = [];
    data.forEach(department => {
      this.itemList.push({ id: department.id, name: department.name, branch: department.branch, checked: false });
    });
  }

  onChange(item: IDepartmentFilter, filtering: boolean = false): void {
    if (filtering) {
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