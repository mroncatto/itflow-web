import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { IComputerCategory } from 'src/app/core/components/computer/model/computer-category';
import { IComputerCpu } from 'src/app/core/components/computer/model/computer-cpu';
import { IComputerMemory } from 'src/app/core/components/computer/model/computer-memory';
import { IComputerStorage } from 'src/app/core/components/computer/model/computer-storage';
import { ComputerService } from 'src/app/core/components/computer/services/computer.service';
import { IDeviceView } from 'src/app/core/components/device/model/device';
import { DeviceComputerForm, IDeviceComputer } from 'src/app/core/components/device/model/device-computer';
import { DeviceService } from 'src/app/core/components/device/services/device.service';
import { AbstractDeviceComputer } from 'src/app/core/shared/abstracts/abstract-device-computer';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  selector: 'app-device-computer-form',
  templateUrl: './device-computer-form.component.html',
  styleUrls: ['./device-computer-form.component.css']
})
export class DeviceComputerFormComponent extends AbstractDeviceComputer implements OnInit, OnDestroy, IAbstractModelForms<IDeviceView> {

  result!: Subject<IDeviceView>;
  device!: IDeviceView;
  deviceComputer!: IDeviceComputer;
  deviceComputerForm!: FormGroup<DeviceComputerForm>;
  computerCategories: IComputerCategory[] = [];
  computerCpus: IComputerCpu[] = [];
  computerMemories: IComputerMemory[] = [];
  computerStorages: IComputerStorage[] = [];
  messages = TranslateMessages;

  constructor(
    private modal: BsModalRef,
    private service: DeviceService,
    private computerService: ComputerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.result = new Subject();
    this.deviceComputerForm = this.service.getDeviceComputerForm();
    this.getCategory();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  private getCategory(): void {
    this.sub.push(
      this.computerService.getCategories().subscribe({
        next: (data) => this.computerCategories = data,
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  payload(device: IDeviceView): void {
    if (device) {
      this.device = device;
      if (device.deviceComputer) {
        this.deviceComputer = device.deviceComputer;
        this.deviceComputerForm = this.service.getDeviceComputerForm(device.deviceComputer);
      }
    }
  }

  save(): void {
    if (this.deviceComputerForm.valid) {
      this.loading = true;
      this.sub.push(
        this.service.updateDeviceComputer(this.device.id, this.deviceComputerForm.value as IDeviceComputer).subscribe({
          next: (data) => this.onSave(data),
          error: (err) => this.onError(err)
        })
      )
    } else {
      this.deviceComputerForm.markAllAsTouched();
      this.service.onWarning(this.messages.WARNING_BAD_REQUEST, this.messages.WARNING_COMPLETE_REQUIRED_FIELDS);
    }
  }

  onSave(deviceComputer: IDeviceComputer): void {
    this.device.deviceComputer = deviceComputer;
    this.device.hasComputer = (deviceComputer != null)
    this.result.next(this.device);
    if (this.deviceComputer) {
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

  onCreateComputerCategory(category: IComputerCategory): void {
    this.computerCategories.push(category);
    this.deviceComputerForm.get("computerCategory")?.setValue(category);
  }

  closeModal() {
    this.modal.hide();
  }

}
