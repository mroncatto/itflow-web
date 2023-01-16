import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { IBranch } from 'src/app/core/components/company/model/branch';
import { IDepartment } from 'src/app/core/components/company/model/department';
import { CompanyService } from 'src/app/core/components/company/services/company.service';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';
import { AbstractDepartment } from '../../../../abstracts/abstract-department';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent extends AbstractDepartment implements OnInit, OnDestroy, IAbstractModelForms<IDepartment> {

  result!: Subject<IDepartment>;
  department!: IDepartment;
  branchs: IBranch[] = [];
  dptoForm!: UntypedFormGroup;
  mainView: boolean = false;

  constructor(
    private modal: BsModalRef,
    private service: CompanyService
  ) {
    super();
  }

  ngOnInit(): void {
    this.result = new Subject();
    this.getBranchs();
    this.dptoForm = this.service.getDepartmentForm();
  }

  payload(depto: IDepartment): void {
    if (depto) {
      this.department = depto;
      this.dptoForm = this.service.getDepartmentForm(depto);
    }
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  private getBranchs(): void {
    this.sub.push(
      this.service.getBranches().subscribe({
        next: (data) => this.branchs = data,
        error: (err) => this.onError(err)
      })
    )
  }

  save(): void {
    if (this.dptoForm.valid) {
      this.loading = true;
      if (this.department && this.department?.id) {
        this.sub.push(
          this.service.updateDepartment(this.dptoForm.value as IDepartment).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        );
      } else {
        this.sub.push(
          this.service.createDepartment(this.dptoForm.value as IDepartment).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      }
    } else {
      this.service.onWarning("badRequest", "fillFieldsRequired");
    }
  }

  onError(err: HttpErrorResponse): void {
    this.loading = false;
    this.service.onHttpError(err);
  }

  onSave(dpto: IDepartment): void {
    this.result.next(dpto);
    if (this.department?.id) {
      this.service.onSuccess("updated", "updated");
    } else {
      this.service.onSuccess("created", "created");
    }
    this.closeModal();
  }

  closeModal() {
    this.modal.hide();
  }

}
