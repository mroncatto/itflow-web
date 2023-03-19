import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { IDevice } from 'src/app/core/components/device/model/device';
import { DeviceStaffForm, IDeviceStaff } from 'src/app/core/components/device/model/device-staff';
import { DeviceService } from 'src/app/core/components/device/services/device.service';
import { IStaff } from 'src/app/core/components/staff/model/staff';
import { StaffService } from 'src/app/core/components/staff/services/staff.service';
import { AbstractDeviceStaff } from 'src/app/core/shared/abstracts/abstract-device-staff';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';

@Component({
  selector: 'app-device-staff-form',
  templateUrl: './device-staff-form.component.html',
  styleUrls: ['./device-staff-form.component.css'],
})

export class DeviceStaffFormComponent extends AbstractDeviceStaff implements OnInit, OnDestroy, IAbstractModelForms<IDevice> {

  result!: Subject<IDevice>;
  device!: IDevice;
  deviceStaff!: IDeviceStaff;
  deviceStaffForm!: FormGroup<DeviceStaffForm>;
  staff: IStaff[] = [];

  constructor(
    private modal: BsModalRef,
    private service: DeviceService,
    private staffService: StaffService
  ) {
    super();
  }

  ngOnInit(): void {
    this.result = new Subject();
    this.deviceStaffForm = this.service.getDeviceStaffForm();
    this.getStaff();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  private getStaff(): void {
    this.sub.push(
      this.staffService.getAllStaff().subscribe({
        next: (data) => this.staff = data,
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  payload(device: IDevice): void {
    if (device) {
      this.device = device;
      if (device.deviceStaff) {
        this.deviceStaff = device.deviceStaff;
        this.deviceStaffForm = this.service.getDeviceStaffForm(device.deviceStaff);
      }
    }
  }

  save(): void {
    if (this.deviceStaffForm.valid) {
      this.loading = true;
      this.sub.push(
        this.service.updateStaff(this.device.id, this.deviceStaffForm.value as IDeviceStaff).subscribe({
          next: (data) => this.onSave(data),
          error: (err) => this.onError(err)
        })
      )
    }
  }

  onSave(device: IDevice): void {
    this.result.next(device);
    if (this.deviceStaff) {
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

  closeModal() {
    this.modal.hide();
  }

}
