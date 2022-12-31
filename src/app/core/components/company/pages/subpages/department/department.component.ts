import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDepartment } from '../../../model/department';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, OnDestroy {

  private sub: Subscription[] = [];
  departments: IDepartment[]=[];
  loading: boolean = true;

  constructor(private service: CompanyService) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  getDepartments(): void {
    this.sub.push(
      this.service.getDepartments().subscribe({
        next: (data) => this.departments = data,
        error: (err) => this.service.onHttpError(err),
        complete: () => this.loading = false
      })
    );
  }

  onCreate(): void {
    this.sub.push(
      this.service.getDptoModal(true).subscribe({
        next: (data) => this.departments.push(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onUpdate(department: IDepartment): void {
    this.sub.push(
      this.service.getDptoModal(true, department).subscribe({
        next: (data) => {
          this.departments.forEach(d => {
            if(d.id === data.id) Object.assign(d, data);
          })
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  confirmDelete(department: IDepartment): void {
    this.sub.push(
      this.service.showConfirm('warning', 'delete', department.name).subscribe({
        next: (confirm) => { if(confirm) this.onDelete(department) }
      })
    );
  }

  onDelete(department: IDepartment): void {
    this.sub.push(
      this.service.deleteDepartment(department).subscribe({
        next: (data) => {
          this.service.onInfo('deleted', 'deleted');
          this.departments = this.departments.filter(d => d.id !== data.id);
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

}
