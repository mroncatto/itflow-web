import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { IPaginator } from 'src/app/core/shared/commons/model/paginator';
import { IStaff } from '../../model/staff';
import { StaffService } from '../../services/staff.service';

@Component({
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  staff: IStaff[] = [];
  errorResponse!: HttpErrorResponse;
  private sub: Subscription[] = [];
  paginator!: IPaginator;

  constructor(private service: StaffService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub.push(
      this.activatedRoute.params.subscribe(params => {
        const page: number = params['page'];
        this.getStaff(page);
      })
    )
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  getStaff(page: number = 0): void {
    this.sub.push(
      this.service.getStaff(page)
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
      this.service.getModalStaff(true).subscribe({
        next: (data) => this.staff.push(data),
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  onUpdate(staff: IStaff): void {
    this.sub.push(
      this.service.getModalStaff(true, staff).subscribe({
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
