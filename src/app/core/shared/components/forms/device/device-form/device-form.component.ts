import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { IDepartment } from 'src/app/core/components/company/model/department';
import { CompanyService } from 'src/app/core/components/company/services/company.service';
import { DeviceForm, IDevice } from 'src/app/core/components/device/model/device';
import { IDeviceCategory } from 'src/app/core/components/device/model/device-category';
import { DeviceService } from 'src/app/core/components/device/services/device.service';
import { AbstractDevice } from 'src/app/core/shared/abstracts/abstract-device';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css']
})
export class DeviceFormComponent extends AbstractDevice implements OnInit, OnDestroy, IAbstractModelForms<IDevice> {

  result!: Subject<IDevice>;
  device!: IDevice;
  deviceForm!: FormGroup<DeviceForm>;
  departments: IDepartment[] = [];
  categories: IDeviceCategory[] = [];

  constructor(
    private modal: BsModalRef,
    private service: DeviceService,
    private companyService: CompanyService
  ) {
    super();
  }

  ngOnInit(): void {
    this.result = new Subject();
    this.deviceForm = this.service.getDeviceForm();
    this.getDepartaments();
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  getCategories(): void {
    this.sub.push(
      this.service.getDeviceCategories().subscribe({
        next: (data) => this.categories = data
      })
    )
  }

  getDepartaments(): void {
    this.sub.push(
      this.companyService.getDepartments().subscribe({
        next: (data) => this.departments = data
      })
    );
  }

  payload(device: IDevice): void {
    if (device) {
      this.deviceForm = this.service.getDeviceForm(device);
      this.device = device;
    }
  }

  save(): void {
    if (this.deviceForm.valid) {
      this.loading = true;
      if (this.device && this.device?.id) {
        this.sub.push(
          this.service.updateDevice(this.deviceForm.value as IDevice).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      } else {
        this.sub.push(
          this.service.createDevice(this.deviceForm.value as IDevice).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      }
    } else {
      this.deviceForm.markAllAsTouched();
      this.service.onWarning(this.messages.WARNING_BAD_REQUEST, this.messages.WARNING_COMPLETE_REQUIRED_FIELDS);
    }
  }

  onSave(device: IDevice): void {
    this.result.next(device);
    if (this.device?.id) {
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

  closeModal() {
    this.modal.hide();
  }

  onCreateDepartment(department: IDepartment): void {
    this.departments.push(department);
    this.deviceForm.controls['department'].setValue(department);
  }

  onCreateCategory(deviceCategory: IDeviceCategory): void {
    this.categories.push(deviceCategory);
    this.deviceForm.controls['deviceCategory'].setValue(deviceCategory);
  }

}
