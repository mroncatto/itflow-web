import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { IAbstractComponentFilter } from 'src/app/core/shared/abstracts/interface/abstract-component-filter';
import { IPaginator } from 'src/app/core/shared/commons/model/paginator';
import { DepartmentCheckboxFilterComponent } from 'src/app/core/shared/components/filters/department-checkbox-filter/department-checkbox-filter.component';
import { OccupationCheckboxFilterComponent } from 'src/app/core/shared/components/filters/occupation-checkbox-filter/occupation-checkbox-filter.component';
import { SearchInputComponent } from 'src/app/core/shared/components/filters/search-input/search-input.component';
import { IDepartmentFilter } from '../../../company/filter/department-filter';
import { IBranch } from '../../../company/model/branch';
import { IOccupationFilter } from '../../filter/occupation-filter';
import { StaffFilter } from '../../filter/staff-filter';
import { Occupation } from '../../model/occupation';
import { IStaff } from '../../model/staff';
import { StaffService } from '../../services/staff.service';

@Component({
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit, OnDestroy, IAbstractComponentFilter {

  loading: boolean = true;
  staff: IStaff[] = [];
  errorResponse!: HttpErrorResponse;
  private sub: Subscription[] = [];
  paginator!: IPaginator;
  page: number = 0;
  filter: StaffFilter = new StaffFilter();

  @ViewChild(SearchInputComponent) searchFilterChild!: SearchInputComponent;
  @ViewChild(DepartmentCheckboxFilterComponent) departmentFilterChild!: DepartmentCheckboxFilterComponent;
  @ViewChild(OccupationCheckboxFilterComponent) occupationFilterChild!: OccupationCheckboxFilterComponent;

  constructor(private service: StaffService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub.push(
      this.activatedRoute.params.subscribe(params => {
        const numPage: number = params['page'];
        if (numPage !== null && numPage !== undefined) this.page = numPage;
        this.getStaff();
      })
    )
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  filterStaff(data: string): void {
    if (data !== null && !this.loading) {
      this.filter.param = data;
      this.loading = true;
      this.getStaff();
    };
  }

  filterDepartment(data: IDepartmentFilter[]): void {
    this.filter.department = data;
    this.loading = true;
    this.getStaff();
  }

  filterOccupation(data: IOccupationFilter[]): void {
    this.filter.occupation = data;
    this.loading = true;
    this.getStaff();
  }

  cleanFilter(): void {
    this.searchFilterChild.clearFilter();
    this.departmentFilterChild.clearSelection();
    this.occupationFilterChild.clearSelection();

    if (this.filter.param.length > 0 || this.filter.department.length > 0) {
      this.filter.param = "";
      this.filter.department = [];
      this.loading = true;
      this.getStaff();
    }
  }

  getStaff(): void {
    this.sub.push(
      this.service.getStaff(this.page, this.filter)
        .pipe(
          tap(res => res.content = this.service.sortById(res.content))
        )
        .subscribe({
          next: (data) => {
            this.staff = data.content;
            this.paginator = data;
          },
          error: (err) => {
            this.service.onHttpError(err);
            this.errorResponse = err;
          },
          complete: () => this.loading = false
        })
    );
  }

  onCreate(): void {
    this.sub.push(
      this.service.getStaffModal().subscribe({
        next: (data) => this.staff.push(data),
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  onUpdate(staff: IStaff): void {
    this.sub.push(
      this.service.getStaffModal(staff).subscribe({
        next: (data) => this.afterUpdate(data),
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private afterUpdate(staff: IStaff): void {
    this.staff.forEach(s => {
      if (s.id === staff.id) Object.assign(s, staff);
    });
  }

  confirmDelete(staff: IStaff): void {
    this.sub.push(
      this.service.showConfirm('warning', 'delete', staff.fullName).subscribe({
        next: (confirm) => {
          if (confirm) this.onDelete(staff)
        },
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private onDelete(staff: IStaff): void {
    this.sub.push(
      this.service.deleteStaff(staff.id).subscribe({
        next: () => this.afterDelete(staff),
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private afterDelete(staff: IStaff): void {
    this.staff = this.staff.filter(s => s.id != staff.id);
    this.service.onInfo("successfully", "staffDeleted");
  }

}
