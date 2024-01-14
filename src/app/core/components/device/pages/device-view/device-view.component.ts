import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AbstractComponent } from 'src/app/core/shared/abstracts/abstract-component';
import { Device, IDevice } from '../../model/device';
import { DeviceService } from '../../services/device.service';
import { ComputerService } from '../../../computer/services/computer.service';
import { IComputerCpu } from '../../../computer/model/computer-cpu';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeviceComputerCpuForm, IDeviceComputerCpu } from '../../model/device-computer-cpu';
import { DeviceComputerMemoryForm, IDeviceComputerMemory } from '../../model/device-computer-memory';
import { IComputerMemory } from '../../../computer/model/computer-memory';
import { DeviceComputerStorageForm, IDeviceComputerStorage } from '../../model/device-computer-storage';
import { IComputerStorage } from '../../../computer/model/computer-storage';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';
import { DeviceComputerSoftwareForm, IDeviceComputerSoftware } from '../../model/device-computer-software';
import { IComputerSoftware } from '../../../computer/model/computer-software';
import { IDeviceComputerSoftwarePK } from '../../model/pk/device-computer-software-pk';

@Component({
  templateUrl: './device-view.component.html',
  styleUrls: ['./device-view.component.css']
})
export class DeviceViewComponent extends AbstractComponent implements OnInit {

  messages = TranslateMessages;

  device!: IDevice | null;
  computerCpuAutoComplete = new FormControl('', Validators.required);
  computerMemoryAutoComplete = new FormControl('', Validators.required);
  computerStorageAutoComplete = new FormControl('', Validators.required);
  computerSoftwareAutoComplete = new FormControl('', Validators.required);

  deviceComputerCpuForm!: FormGroup<DeviceComputerCpuForm>;
  deviceComputerMemoryForm!: FormGroup<DeviceComputerMemoryForm>;
  deviceComputerStorageForm!: FormGroup<DeviceComputerStorageForm>;
  deviceComputerSoftwareForm!: FormGroup<DeviceComputerSoftwareForm>;

  @ViewChild('featuresTabs', { static: false }) featuresTabs?: TabsetComponent;
  @ViewChild('propertiesTabs', { static: false }) propertiesTabs?: TabsetComponent;

  constructor(
    private service: DeviceService,
    private computerService: ComputerService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.loading = true;
      const deviceID: number = params['id'];
      if (deviceID == null || deviceID == undefined) this.notFound()
      this.findDevice(deviceID);
    });
  }

  startForms(): void {
    this.startFormComputer();
  }

  startFormComputer(): void {
    if (this.device?.deviceComputer) {
      this.deviceComputerCpuForm = this.computerService.getDeviceComputerCpuForm(this.device.deviceComputer);
      this.deviceComputerMemoryForm = this.computerService.getDeviceComputerMemoryForm(this.device.deviceComputer);
      this.deviceComputerStorageForm = this.computerService.getDeviceComputerStorageForm(this.device.deviceComputer);
      this.deviceComputerSoftwareForm = this.computerService.getDeviceComputerSoftwareForm(this.device.deviceComputer);
    }
  }

  private notFound(): void {
    this.router.navigate(['device']);
  }

  private findDevice(id: number): void {
    this.sub.push(
      this.service.getDeviceById(id).subscribe({
        next: (data) => this.device = data,
        error: (err) => {
          this.service.onHttpError(err);
          this.notFound();
        },
        complete: () => {
          this.loading = false;
          this.startForms();
        }
      })
    )
  }

  onUpdate(): void {
    if (this.device != null) {
      this.sub.push(
        this.service.getDeviceModal(this.device).subscribe({
          next: (data) => this.afterUpdate(data),
          error: (err) => this.service.onHttpError(err)
        })
      );
    }
  }

  isEmptyOrNull(list: any): boolean {
    return list == null || list == undefined || list.length == 0
  }

  private afterUpdate(device: IDevice): void {
    if (this.device != null) {
      Object.assign(this.device, device);
    }
  }

  confirmDeleteDeviceStaff(): void {
    this.sub.push(
      this.service.showConfirm(this.messages.WARNING, this.messages.REMOVE, 'User').subscribe({
        next: (confirm) => {
          if (confirm) this.onDeleteDeviceStaff()
        },
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private onDeleteDeviceStaff(): void {
    if (this.device != null) {
      this.sub.push(
        this.service.deleteDeviceStaff(this.device.id).subscribe({
          next: (data) => this.afterDeleteDeviceFeatures(data),
          error: (err) => this.service.onHttpError(err)
        })
      )
    }
  }

  confirmDeleteDeviceComputer(): void {
    this.sub.push(
      this.service.showConfirm(this.messages.WARNING, this.messages.REMOVE, 'Computer').subscribe({
        next: (confirm) => {
          if (confirm) this.onDeleteDeviceComputer()
        },
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private onDeleteDeviceComputer(): void {
    if (this.device != null) {
      this.sub.push(
        this.service.deleteDeviceComputer(this.device.id).subscribe({
          next: (data) => this.afterDeleteDeviceFeatures(data),
          error: (err) => this.service.onHttpError(err)
        })
      )
    }
  }

  private afterDeleteDeviceFeatures(device: IDevice): void {
    this.selectTab(0);
    this.device = device;
    this.service.onSuccess(this.messages.INFO_SUCCESS, this.messages.INFO_DELETED);
  }

  onAddOrChangeStaff(): void {
    if (this.device != null) {
      this.sub.push(
        this.service.getDeviceStaffModal(this.device).subscribe({
          next: (data) => this.device = data,
          error: (err) => this.service.onHttpError(err)
        })
      );
    }
  }

  onAddOrChangeComputer(): void {
    if (this.device != null) {
      this.sub.push(
        this.service.getDeviceComputerModal(this.device).subscribe({
          next: (data) => {
            this.device = data; this.startFormComputer()
          },
          error: (err) => this.service.onHttpError(err)
        })
      );
    }
  }

  selectTab(tabId: number) {
    if (this.featuresTabs?.tabs[tabId]) {
      this.featuresTabs.tabs[tabId].active = true;
    }
  }

  canAddFeatures(): boolean {
    if (this.device)
      return this.device.active && (this.device.deviceStaff == null || this.device.deviceComputer == null);

    return false;
  }

  onSelectCpu(cpu: IComputerCpu | null): void {
    if (cpu) {
      this.deviceComputerCpuForm.controls['computerCpu'].setValue(cpu);
      this.deviceComputerCpuForm.controls['core'].setValue(cpu.core ? cpu.core : "1");
      //this.nextFocus('unit'); TODO: Criar evento focus no formulario
    } else {
      this.deviceComputerCpuForm.controls['computerCpu'].reset();
    }
  }

  onSelectMemory(memory: IComputerMemory | null): void {
    if (memory) {
      this.deviceComputerMemoryForm.controls['computerMemory'].setValue(memory);
      this.deviceComputerMemoryForm.controls['modules'].setValue(1);
    } else {
      this.deviceComputerMemoryForm.controls['computerMemory'].reset();
    }
  }

  onSelectStorage(storage: IComputerStorage | null): void {
    if (storage) {
      this.deviceComputerStorageForm.controls['computerStorage'].setValue(storage);
      this.deviceComputerStorageForm.controls['size'].setValue(1);
    } else {
      this.deviceComputerStorageForm.controls['computerStorage'].reset();
    }
  }

  onSelectSoftware(software: IComputerSoftware | null): void {
    if (software) {
      this.deviceComputerSoftwareForm.controls['software'].setValue(software);
    } else {
      this.deviceComputerSoftwareForm.controls['software'].reset();
    }
  }

  saveDeviceComputerCpu(): void {
    if (this.device && this.deviceComputerCpuForm.valid) {
      this.sub.push(
        this.service.updateDeviceComputerCpu(this.device.id, this.deviceComputerCpuForm.value as IDeviceComputerCpu).subscribe({
          next: (data) => this.onDeviceComputerCpuSave(data),
          error: (err) => this.service.onHttpError(err)
        })
      );
    }
  }

  onDeviceComputerCpuSave(data: Device): void {
    this.device = data;
    this.computerCpuAutoComplete.reset();
    this.deviceComputerCpuForm.reset();
    this.service.onInfo(this.messages.INFO_SUCCESS, this.messages.INFO_UPDATED);
  }

  onConfirmDeleteComputerCpu(cpu: IComputerCpu): void {
    this.sub.push(
      this.service.showConfirm(this.messages.WARNING, this.messages.MODAL_REMOVE_COMPUTER_CPU, `${cpu.brandName}-${cpu.model}`).subscribe({
        next: (confirm) => { if (confirm) this.onRemoveComputerCpu(cpu) }
      })
    );
  }

  private onRemoveComputerCpu(cpu: IComputerCpu): void {
    if (this.device) {
      this.sub.push(
        this.service.deleteDeviceComputerCpu(this.device.id, cpu.id).subscribe({
          next: () => this.filterCpuDeleted(cpu.id),
          error: (err) => this.service.onHttpError(err)
        })
      );
    }
  }

  private filterCpuDeleted(id: number): void {
    if (this.device) {
      this.device.deviceComputer.computerCpuList = this.device.deviceComputer.computerCpuList
        .filter(cpu => cpu.computerCpu.id !== id);
      this.service.onInfo(this.messages.INFO_SUCCESS, this.messages.INFO_DELETED);
    }
  }

  saveDeviceComputerMemory(): void {
    if (this.device && this.deviceComputerMemoryForm.valid) {
      this.sub.push(
        this.service.updateDeviceComputerMemory(this.device.id, this.deviceComputerMemoryForm.value as IDeviceComputerMemory).subscribe({
          next: (data) => this.onDeviceComputerMemorySave(data),
          error: (err) => this.service.onHttpError(err)
        })
      );
    }
  }

  onDeviceComputerMemorySave(data: Device): void {
    this.device = data;
    this.computerMemoryAutoComplete.reset();
    this.deviceComputerMemoryForm.reset();
    this.service.onInfo(this.messages.INFO_SUCCESS, this.messages.INFO_UPDATED);
  }

  onConfirmDeleteComputerMemory(memory: IComputerMemory): void {
    this.sub.push(
      this.service.showConfirm(this.messages.WARNING, this.messages.MODAL_REMOVE_COMPUTER_MEMORY, `${memory.brandName} - ${memory.size}GB`).subscribe({
        next: (confirm) => { if (confirm) this.onRemoveComputerMemory(memory) }
      })
    );
  }

  private onRemoveComputerMemory(memory: IComputerMemory): void {
    if (this.device) {
      this.sub.push(
        this.service.deleteDeviceComputerMemory(this.device.id, memory.id).subscribe({
          next: () => this.filterMemoryDeleted(memory.id),
          error: (err) => this.service.onHttpError(err)
        })
      );
    }
  }

  private filterMemoryDeleted(id: number): void {
    if (this.device) {
      this.device.deviceComputer.computerMemoryList = this.device.deviceComputer.computerMemoryList
        .filter(memory => memory.computerMemory.id !== id);
      this.service.onInfo(this.messages.INFO_SUCCESS, this.messages.INFO_DELETED);
    }
  }

  saveDeviceComputerStorage(): void {
    if (this.device && this.deviceComputerStorageForm.valid) {
      this.sub.push(
        this.service.updateDeviceComputerStorage(this.device.id, this.deviceComputerStorageForm.value as IDeviceComputerStorage).subscribe({
          next: (data) => this.onDeviceComputerStorageSave(data),
          error: (err) => this.service.onHttpError(err)
        })
      );
    }
  }

  onDeviceComputerStorageSave(data: Device): void {
    this.device = data;
    this.computerStorageAutoComplete.reset();
    this.deviceComputerStorageForm.reset();
    this.service.onInfo(this.messages.INFO_SUCCESS, this.messages.INFO_UPDATED);
  }

  saveDeviceComputerSoftware(): void {
    if (this.device && this.deviceComputerSoftwareForm.controls.software.valid) {
      this.deviceComputerSoftwareForm.controls.deviceComputer.setValue(this.device.deviceComputer);
      this.sub.push(
        this.service.updateDeviceComputerSoftware(this.device.id, this.deviceComputerSoftwareForm.value as IDeviceComputerSoftware).subscribe({
          next: (data) => this.onDeviceComputerSoftwareSave(data),
          error: (err) => this.service.onHttpError(err)
        })
      );
    } else {
      console.error(this.deviceComputerSoftwareForm.errors);
    }

  }

  onDeviceComputerSoftwareSave(data: Device): void {
    this.device = data;
    this.computerSoftwareAutoComplete.reset();
    this.deviceComputerSoftwareForm.reset();
    this.service.onInfo(this.messages.INFO_SUCCESS, this.messages.INFO_UPDATED);
  }



  onConfirmDeleteComputerStorage(storage: IComputerStorage): void {
    this.sub.push(
      this.service.showConfirm(this.messages.WARNING, this.messages.MODAL_REMOVE_COMPUTER_STORAGE, `${storage.brandName} - ${storage.type}`).subscribe({
        next: (confirm) => { if (confirm) this.onRemoveComputerStorage(storage) }
      })
    );
  }

  private onRemoveComputerStorage(storage: IComputerStorage): void {
    if (this.device) {
      this.sub.push(
        this.service.deleteDeviceComputerStorage(this.device.id, storage.id).subscribe({
          next: () => this.filterStorageDeleted(storage.id),
          error: (err) => this.service.onHttpError(err)
        })
      );
    }
  }

  private filterStorageDeleted(id: number): void {
    if (this.device) {
      this.device.deviceComputer.computerStorageList = this.device.deviceComputer.computerStorageList
        .filter(storage => storage.computerStorage.id !== id);
      this.service.onInfo(this.messages.INFO_SUCCESS, this.messages.INFO_DELETED);
    }
  }


}



