import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { IComputerSoftware } from 'src/app/core/components/computer/model/computer-software';
import { ISoftwareLicense, SoftwareLicenseForm } from 'src/app/core/components/computer/model/software-license';
import { ComputerService } from 'src/app/core/components/computer/services/computer.service';
import { AbstractComponent } from 'src/app/core/shared/abstracts/abstract-component';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  selector: 'app-computer-license-form',
  templateUrl: './computer-license-form.component.html',
  styleUrls: ['./computer-license-form.component.css']
})
export class ComputerLicenseFormComponent extends AbstractComponent implements OnInit, OnDestroy, IAbstractModelForms<ISoftwareLicense> {
  
  softwareLicense!: ISoftwareLicense;
  softwareLicenseForm!: FormGroup<SoftwareLicenseForm>;
  result!: Subject<ISoftwareLicense>;
  messages = TranslateMessages;
  softwares: IComputerSoftware[]=[];

  constructor(
    private service: ComputerService,
    private modal: BsModalRef
  ) {
    super();
  }
  

  ngOnInit(): void {
    this.result = new Subject();
    this.softwareLicenseForm = this.service.getSoftwareLicenseForm();
    this.getSoftwares();
  }

  private getSoftwares(): void {
    this.sub.push(
      this.service.getComputerSoftware().subscribe({
        next: (data) => this.softwares = data,
        error: (err) => this.onError(err)
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  payload(softwareLicense: ISoftwareLicense): void {
    if (softwareLicense) {
      this.softwareLicenseForm = this.service.getSoftwareLicenseForm(softwareLicense);
      this.softwareLicense = softwareLicense;
    }
  }

  save(): void {
    if(this.softwareLicenseForm.valid) {
      this.loading = true;
      if (this.softwareLicense && this.softwareLicense?.id) {
        this.sub.push(
          this.service.updateSoftwareLicense(this.softwareLicenseForm.value as ISoftwareLicense).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      } else {
        this.sub.push(
          this.service.createSoftwareLicense(this.softwareLicenseForm.value as ISoftwareLicense).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      }
    } else {
      this.softwareLicenseForm.markAllAsTouched();
      this.service.onWarning(this.messages.WARNING_BAD_REQUEST, this.messages.WARNING_COMPLETE_REQUIRED_FIELDS);
    }
  }

  onSave(license: ISoftwareLicense): void {
    this.result.next(license);
    if (this.softwareLicense?.id) {
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
