import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { DeviceCategoryForm, IDeviceCategory } from 'src/app/core/components/device/model/device-category';
import { DeviceService } from 'src/app/core/components/device/services/device.service';
import { AbstractDevice } from 'src/app/core/shared/abstracts/abstract-device';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';

@Component({
  selector: 'app-device-category-form',
  templateUrl: './device-category-form.component.html',
  styleUrls: ['./device-category-form.component.css']
})
export class DeviceCategoryFormComponent extends AbstractDevice implements OnInit, OnDestroy, IAbstractModelForms<IDeviceCategory>  {

  deviceCategory!: IDeviceCategory;
  deviceCategoryForm!: FormGroup<DeviceCategoryForm>;
  result!: Subject<IDeviceCategory>;

  constructor(private service: DeviceService, private modal: BsModalRef) {
    super();
  }

  ngOnInit(): void {
    this.result = new Subject();
    this.deviceCategoryForm = this.service.getDeviceCategoryForm();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  
  payload(deviceCategory: IDeviceCategory): void {
    if (deviceCategory) {
      this.deviceCategoryForm = this.service.getDeviceCategoryForm(deviceCategory);
      this.deviceCategory = deviceCategory;
    }
  }

  save(): void {
    if (this.deviceCategoryForm.valid) {
      this.loading = true;
      if (this.deviceCategory && this.deviceCategory?.id) {
        this.sub.push(
          this.service.updateDeviceCategory(this.deviceCategoryForm.value as IDeviceCategory).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      } else {
        this.sub.push(
          this.service.createDeviceCategory(this.deviceCategoryForm.value as IDeviceCategory).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      }
    } else {
      this.deviceCategoryForm.markAllAsTouched();
      this.service.onWarning("badRequest", "fillFieldsRequired");
    }
  }

  onSave(deviceCategory: IDeviceCategory): void {
    this.result.next(deviceCategory);
    if (this.deviceCategory?.id) {
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
