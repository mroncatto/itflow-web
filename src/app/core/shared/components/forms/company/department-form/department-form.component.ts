import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { IBranch } from 'src/app/core/components/company/model/branch';
import { DepartmentForm, IDepartment } from 'src/app/core/components/company/model/department';
import { CompanyService } from 'src/app/core/components/company/services/company.service';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';
import { AbstractDepartment } from '../../../../abstracts/abstract-department';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent extends AbstractDepartment implements OnInit, OnDestroy, IAbstractModelForms<IDepartment> {

  result!: Subject<IDepartment>;
  department!: IDepartment;
  branchs: IBranch[] = [];
  dptoForm!: FormGroup<DepartmentForm>;
  messages = TranslateMessages;

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
      this.dptoForm.markAllAsTouched();
      this.service.onWarning(this.messages.WARNING_BAD_REQUEST, this.messages.WARNING_COMPLETE_REQUIRED_FIELDS);
    }
  }

  onError(err: HttpErrorResponse): void {
    this.loading = false;
    this.service.onHttpError(err);
  }

  onSave(dpto: IDepartment): void {
    this.result.next(dpto);
    if (this.department?.id) {
      this.service.onSuccess(this.messages.INFO_SUCCESS, this.messages.INFO_UPDATED);
    } else {
      this.service.onSuccess(this.messages.INFO_SUCCESS, this.messages.INFO_CREATED);
    }
    this.closeModal();
  }

  closeModal() {
    this.modal.hide();
  }

  onCreateBranch(branch: IBranch): void {
    this.branchs.push(branch);
    this.dptoForm.controls['branch'].setValue(branch);
  }

}
