import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ISoftwareLicense } from 'src/app/core/components/computer/model/software-license';
import { ISoftwareLicenseKey, SoftwareLicenseKeyForm } from 'src/app/core/components/computer/model/software-license-keys';
import { ComputerService } from 'src/app/core/components/computer/services/computer.service';
import { AbstractComponent } from 'src/app/core/shared/abstracts/abstract-component';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  selector: 'app-license-key',
  templateUrl: './license-key.component.html',
  styleUrls: ['./license-key.component.css']
})
export class LicenseKeyComponent extends AbstractComponent implements OnInit, OnDestroy, IAbstractModelForms<ISoftwareLicense> {

  result!: Subject<ISoftwareLicense>;
  license!: ISoftwareLicense;
  licenseKeyForm!: FormGroup<SoftwareLicenseKeyForm>;
  messages = TranslateMessages;

  constructor(
    private modal: BsModalRef,
    private service: ComputerService
  ) { super() }

  ngOnInit(): void {
    this.result = new Subject();
    this.licenseKeyForm = this.service.getLicenseKeyForm();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }


  payload(license: ISoftwareLicense): void {
    if (license) {
      this.loading = true;
      this.sub.push(
        this.service.getSoftwareLicenseById(license.id).subscribe({
          next: (data) => this.onLoadLicense(data),
          error: (err) => this.onError(err)
        })
      )
    };
  }

  private onLoadLicense(data: ISoftwareLicense) : void {
    this.license = data;
    this.loading = false;
  }


  save(): void {
    if (this.licenseKeyForm.valid) {
      this.loading = true;
      this.sub.push(
        this.service.addLicenseKey(this.license.id, this.licenseKeyForm.value as ISoftwareLicenseKey).subscribe({
          next: (data) => this.onSave(data),
          error: (err) => this.onError(err)
        })
      )
    } else {
      this.licenseKeyForm.markAllAsTouched();
      this.service.onWarning(this.messages.WARNING_BAD_REQUEST, this.messages.WARNING_COMPLETE_REQUIRED_FIELDS);
    }
  }


  onSave(license: ISoftwareLicense): void {
    this.licenseKeyForm = this.service.getLicenseKeyForm();
    this.service.onSuccess(this.messages.INFO_SUCCESS, this.messages.INFO_CREATED);
    this.license.keys = license.keys;
    this.loading = false;
  }


  onError(err: HttpErrorResponse): void {
    this.service.onHttpError(err);
    this.loading = false;
  }


  closeModal(): void {
    this.modal.hide();
  }

  onConfirmDelete(key: ISoftwareLicenseKey): void {
    this.sub.push(
      this.service.showConfirm(this.messages.WARNING, this.messages.MODAL_DELETE_KEY, key.key).subscribe({
        next: (confirm) => { if (confirm) this.onConfirmeAssignments(key) }
      })
    );
  }

  onConfirmeAssignments(key: ISoftwareLicenseKey): void {
    if (this.validateKeyInUse(key)) {
      this.sub.push(
        this.service.showConfirm(this.messages.ATTENTION, this.messages.MODAL_DELETE_KEY_ASSIGN).subscribe({
          next: (confirm) => { if (confirm) this.onRemoveKey(key) }
        })
      )
    } else {
      this.onRemoveKey(key);
    }
  }

  onRemoveKey(key: ISoftwareLicenseKey): void {
    this.sub.push(
      this.service.removeLicenseKey(this.license.id, key).subscribe({
        next: (data) => {
          this.service.onInfo(this.messages.INFO_SUCCESS, this.messages.INFO_DELETED);
          this.license.keys = data.keys;
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  validateKeyInUse(key: ISoftwareLicenseKey): boolean {
    return false;
    // TODO: validar
  }

  assignLicenseKey(key: ISoftwareLicenseKey): void {
    this.sub.push(
      this.service.getKeyAssignModal(key).subscribe({
        next: (data) => key = data,
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

}
