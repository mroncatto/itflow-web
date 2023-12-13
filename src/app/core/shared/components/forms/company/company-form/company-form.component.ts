import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { CompanyService } from 'src/app/core/components/company/services/company.service';
import { CompanyForm, ICompany } from '../../../../../components/company/model/company';
import { AbstractCompany } from '../../../../abstracts/abstract-company';
import { IAbstractModelForms } from '../../../../abstracts/interface/abstract-model-forms';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent extends AbstractCompany implements OnInit, OnDestroy, IAbstractModelForms<ICompany> {

  result!: Subject<ICompany>;
  company!: ICompany;
  companyForm!: FormGroup<CompanyForm>;
  messages = TranslateMessages;

  constructor(
    private modal: BsModalRef,
    private service: CompanyService
  ) {
    super();
  }

  ngOnInit(): void {
    this.result = new Subject();
    this.companyForm = this.service.getCompanyForm();
  }

  payload(company: ICompany): void {
    if (company) {
      this.companyForm = this.service.getCompanyForm(company);
      this.company = company;
    }
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  loadForm(company: ICompany): void {
    this.company = company;
    if (company) this.companyForm = this.service.getCompanyForm(company);
  }

  save(): void {
    if (this.companyForm.valid) {
      this.loading = true;
      if (this.company && this.company.id) {
        this.sub.push(
          this.service.updateCompany(this.companyForm.value as ICompany).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => {
              this.loading = false;
              this.service.onHttpError(err);
            }
          })
        )
      } else {
        this.sub.push(
          this.service.createCompany(this.companyForm.value as ICompany).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      }
    } else {
      this.companyForm.markAllAsTouched();
      this.service.onWarning(this.messages.WARNING_BAD_REQUEST, this.messages.WARNING_COMPLETE_REQUIRED_FIELDS);
    }
  }

  onSave(company: ICompany): void {
    this.result.next(company);
    if (this.company?.id) {
      this.service.onSuccess(this.messages.INFO_SUCCESS, this.messages.INFO_UPDATED);
    } else {
      this.service.onSuccess(this.messages.INFO_SUCCESS, this.messages.INFO_CREATED);
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
