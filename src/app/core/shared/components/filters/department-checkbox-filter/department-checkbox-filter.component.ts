import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IDepartmentFilter } from 'src/app/core/components/company/filter/department-filter';
import { IBranch } from 'src/app/core/components/company/model/branch';
import { Department } from 'src/app/core/components/company/model/department';
import { CompanyService } from 'src/app/core/components/company/services/company.service';
import { AbstractFilter } from '../../../abstracts/abstract-filter';
import { IAbstractCheckboxFilter } from '../../../abstracts/interface/abstract-checkbox-filter';

@Component({
  selector: 'app-department-checkbox-filter',
  templateUrl: './department-checkbox-filter.component.html',
  styleUrls: ['./department-checkbox-filter.component.css']
})
export class DepartmentCheckboxFilterComponent extends AbstractFilter implements OnInit, OnDestroy, IAbstractCheckboxFilter<Department> {

  private departments: Department[] = [];
  itemList: IDepartmentFilter[] = [];
  filteredItemList: IDepartmentFilter[] = [];
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  constructor(private service: CompanyService) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  loadData(): void {  
    if (this.departments.length > 0) return;
    this.loading = true;
    this.clearData();
    this.sub.push(
      this.service.getDepartments().subscribe({
        next: (data) => this.onSuccess(data),
        error: (err) => this.loading = false
      })
    );
  }

  onSuccess(data: Department[]): void {
    this.loading = false;
    this.departments = data;
    this.itemList = [];
    data.forEach(department => {
      this.itemList.push({ id: department.id, name: department.name, branch: department.branch, checked: false });
    });
  }

  onChange(item: IDepartmentFilter, filtering: boolean = false): void {
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

  clearFilter(): void {
    this.filterInput = "";
    this.filteredItemList = [];
  }

  clearData(): void {
    this.departments = [];
    this.itemList = [];
    this.filteredItemList = [];
  }

  countSelectedItems(): number {
    return this.itemList.filter(d => d.checked).length;
  }

  getFirstSelectedItemName(): string {
    if (this.itemList.length > 0)
      return this.itemList
        .filter(d => d.checked)[0]
        .name;

    return "";
  }

  selectionCounterExpresion(): string {
    if (this.countSelectedItems() > 1) return "+" + (this.countSelectedItems() - 1);
    return "";
  }

  filter(): void {
    if (this.filterInput.length > 0) {
      this.filteredItemList = this.itemList.filter(d => {
        return this.normalize(d.name).startsWith(this.normalize(this.filterInput))
          || this.normalize(d.name).includes(this.normalize(this.filterInput));
      });
    } else {
      this.filteredItemList = [];
    }
  }

}
