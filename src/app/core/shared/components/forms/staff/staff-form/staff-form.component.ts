import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, UntypedFormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { IDepartment } from 'src/app/core/components/company/model/department';
import { CompanyService } from 'src/app/core/components/company/services/company.service';
import { IOccupation, Occupation } from 'src/app/core/components/staff/model/occupation';
import { IStaff, StaffForm } from 'src/app/core/components/staff/model/staff';
import { StaffService } from 'src/app/core/components/staff/services/staff.service';
import { AbstractStaff } from 'src/app/core/shared/abstracts/abstract-staff';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css']
})
export class StaffFormComponent extends AbstractStaff implements OnInit, OnDestroy, IAbstractModelForms<IStaff> {

  result!: Subject<IStaff>;
  staff!: IStaff;
  staffForm!: FormGroup<StaffForm>;
  departments: IDepartment[] = [];
  occupations: Occupation[] = [];

  constructor(
    private modal: BsModalRef,
    private service: StaffService,
    private companyService: CompanyService
  ) {
    super();
  }

  ngOnInit(): void {
    this.result = new Subject();
    this.staffForm = this.service.getStaffForm();
    this.loadOccupation();
    this.loadDepartments();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  payload(staff: IStaff): void {
    if (staff) {
      this.staffForm = this.service.getStaffForm(staff);
      this.staff = staff;
    }
  }

  save(): void {
    if (this.staffForm.valid) {
      this.loading = true;
      if (this.staff && this.staff?.id) {
        this.sub.push(
          this.service.updateStaff(this.staffForm.value as IStaff).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      } else {
        this.sub.push(
          this.service.createStaff(this.staffForm.value as IStaff).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      }
    } else {
      this.service.onWarning("badRequest", "fillFieldsRequired");
    }
  }

  onSave(user: IStaff): void {
    this.result.next(user);
    if (this.staff?.id) {
      this.service.onSuccess("updated", "updated");
    } else {
      this.service.onSuccess("created", "created");
    }
    this.closeModal();
  }

  onError(err: HttpErrorResponse): void {
    this.loading = false;
    this.service.onHttpError(err);
  }

  private loadOccupation(): void {
    this.sub.push(
      this.service.getOccupation().subscribe({
        next: (data) => this.occupations = data,
        error: (err) => this.onError(err)
      })
    );
  }

  private loadDepartments(): void {
    this.sub.push(
      this.companyService.getDepartments().subscribe({
        next: (data) => this.departments = data,
        error: (err) => this.onError(err)
      })
    );
  }

  onCreateDepartment(department: IDepartment): void {
    this.departments.push(department);
    this.staffForm.controls['department'].setValue(department);
  }

  onCreateOccupation(occupation: IOccupation): void {
    this.occupations.push(occupation);
    this.staffForm.controls['occupation'].setValue(occupation);
  }

  closeModal() {
    this.modal.hide();
  }

}
