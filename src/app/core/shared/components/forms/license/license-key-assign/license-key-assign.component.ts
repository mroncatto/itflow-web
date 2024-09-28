import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ISoftwareLicenseKey, SoftwareLicenseKeyForm } from 'src/app/core/components/computer/model/software-license-keys';
import { ComputerService } from 'src/app/core/components/computer/services/computer.service';
import { IDeviceComputer, IDeviceComputerDto } from 'src/app/core/components/device/model/device-computer';
import { DeviceComputerSoftwareForm, DeviceComputerSoftwareAssignForm, IDeviceComputerSoftware } from 'src/app/core/components/device/model/device-computer-software';
import { AbstractComponent } from 'src/app/core/shared/abstracts/abstract-component';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  selector: 'app-license-key-assign',
  templateUrl: './license-key-assign.component.html',
  styleUrls: ['./license-key-assign.component.css']
})
export class LicenseKeyAssignComponent extends AbstractComponent implements OnInit, OnDestroy, IAbstractModelForms<ISoftwareLicenseKey> {


  result!: Subject<ISoftwareLicenseKey>;
  licenseKey!: ISoftwareLicenseKey;
  licenseKeyAssignForm!: FormGroup<DeviceComputerSoftwareAssignForm>;
  messages = TranslateMessages;
  deviceComputerAutoComplete = new FormControl('', Validators.required);


  constructor(
    private modal: BsModalRef,
    private service: ComputerService
  ) { super() }

  ngOnInit(): void {
    this.result = new Subject();
    this.licenseKeyAssignForm = this.service.getLicenseKeyAssignForm();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  payload(licenseKey: ISoftwareLicenseKey): void {
    if (licenseKey) {
      this.loading = true;
      this.sub.push(
        this.service.getSoftwareLicenseKey(licenseKey.id).subscribe({
          next: (data) => this.onLoadKeyAssignments(data),
          error: (err) => this.onError(err)
        })
      );
    }
  }

  onLoadKeyAssignments(data: ISoftwareLicenseKey): void {
    this.licenseKey = data
    this.loading = false;
  }

  save(): void {
    if (this.licenseKeyAssignForm.valid && this.validateNotExistsDeviceAssigned()) {
      this.loading = true;
      const deviceComputerSoftware = this.licenseKeyAssignForm.value as IDeviceComputerSoftware;
      this.sub.push(
        this.service.addLicenseKeyAssign(this.licenseKey.id, deviceComputerSoftware).subscribe({
          next: (data) => this.onAddKeyAssignments(data),
          error: (err) => this.onError(err)
        })
      );
    } else {
      this.service.onWarning(this.messages.WARNING_ATTENTION, this.messages.WARNING_COMPLETE_REQUIRED_FIELDS);
    }
  }

  onAddKeyAssignments(data: IDeviceComputerSoftware): void {
    this.licenseKey.assignedLicenses.push(data);
    this.deviceComputerAutoComplete.reset();
    this.loading = false;
  }

  onSave(entity: any): void {
    //this.licenseKeyForm.reset();
    this.service.onSuccess(this.messages.INFO_SUCCESS, this.messages.INFO_UPDATED);
    //this.license.keys = license.keys;
    this.loading = false;
  }

  onError(err: HttpErrorResponse): void {
    this.service.onHttpError(err);
    this.loading = false;
  }

  closeModal(): void {
    this.modal.hide();
  }

  onConfirmDelete(assign: any): void {

  }

  onSelectComputer(computer: IDeviceComputer | null): void {
    if (computer) {
      //this.licenseKeyAssignForm.controls['deviceComputer'].setValue(computer);
      //this.licenseKeyAssignForm.controls['software'].setValue(this.licenseKey.softwareLicense.software);
    } else {
      //this.licenseKeyAssignForm.controls['software'].reset();
    }
  }

  private validateNotExistsDeviceAssigned(): boolean {
    const computer = this.licenseKeyAssignForm.get('deviceComputer')?.value;
    if (computer == null) return false;
    /*if (this.licenseKey.assignedLicenses.filter(assig => assig.deviceComputer.id == computer.id).length > 0) {
      this.service.onWarning(this.messages.WARNING, this.messages.WARNING_REGISTER_IN_THE_LIST);
      return false;
    }*/
    return true;
  }


}
