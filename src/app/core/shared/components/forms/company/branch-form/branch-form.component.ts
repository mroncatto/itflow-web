import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { IBranch } from 'src/app/core/components/company/model/branch';
import { ICompany } from 'src/app/core/components/company/model/company';
import { CompanyService } from 'src/app/core/components/company/services/company.service';
import { AbstractBranch } from 'src/app/core/shared/abstracts/abstract-branch';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.css']
})
export class BranchFormComponent extends AbstractBranch implements OnInit, OnDestroy, IAbstractModelForms<IBranch> {

  result!: Subject<IBranch>;
  branchForm!: FormGroup;
  branch!: IBranch;
  companies: ICompany[] = [];

  constructor(
    private service: CompanyService,
    private modal: BsModalRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.result = new Subject();
    this.getCompanies();
    this.branchForm = this.service.getBranchForm();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  private getCompanies(): void {
    this.sub.push(
      this.service.getCompanies().subscribe({
        next: (data) => this.companies = data,
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  payload(branch: IBranch): void {
    if (branch) {
      this.branchForm = this.service.getBranchForm(branch);
      this.branch = branch;
    }
  }
  save(): void {
    if (this.branchForm.valid) {
      this.loading = true;

      if (this.branch && this.branch.id) {
        this.sub.push(
          this.service.updateBranch(this.branchForm.value as IBranch).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        );
      } else {
        this.sub.push(
          this.service.createBranch(this.branchForm.value as IBranch).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        );
      }
    } else {
      this.service.onWarning("badRequest", "fillFieldsRequired");
    }
  }
  onSave(branch: IBranch): void {
    this.result.next(branch);
    if (this.branch?.id) {
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

  closeModal(): void {
    this.modal.hide();
  }

}
