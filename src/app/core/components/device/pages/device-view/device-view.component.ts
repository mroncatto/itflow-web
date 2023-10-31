import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AbstractComponent } from 'src/app/core/shared/abstracts/abstract-component';
import { Device, IDevice } from '../../model/device';
import { DeviceService } from '../../services/device.service';
import { ComputerService } from '../../../computer/services/computer.service';
import { Observable, finalize, map, pipe } from 'rxjs';
import { IComputerCpu } from '../../../computer/model/computer-cpu';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeviceComputerCpuForm, IDeviceComputerCpu } from '../../model/device-computer-cpu';

@Component({
  templateUrl: './device-view.component.html',
  styleUrls: ['./device-view.component.css']
})
export class DeviceViewComponent extends AbstractComponent implements OnInit {


  device!: IDevice | null;
  computerCpuAutoComplete = new FormControl('', Validators.required);
  deviceComputerCpuForm!: FormGroup<DeviceComputerCpuForm>;

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
    if (this.device?.deviceComputer)
      this.deviceComputerCpuForm = this.computerService.getDeviceComputerCpuForm(this.device.deviceComputer);
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

  private afterUpdate(device: IDevice): void {
    if (this.device != null) {
      Object.assign(this.device, device);
    }
  }

  confirmDeleteDeviceStaff(): void {
    this.sub.push(
      this.service.showConfirm('warning', 'remove', 'User').subscribe({
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
      this.service.showConfirm('warning', 'remove', 'Computer').subscribe({
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
    this.service.onSuccess('deleted', 'deleted');
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
          next: (data) => { console.log(data);
           this.device = data; this.startFormComputer()},
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
    if (this.device) {
      return this.device.active
        && (this.device.deviceStaff == null)
        || (this.device.deviceComputer == null);
    }

    return false;
  }

  onSelectCpu(cpu: IComputerCpu | null): void {
    if (cpu) {
      this.deviceComputerCpuForm.controls['computerCpu'].setValue(cpu);
      this.deviceComputerCpuForm.controls['core'].setValue( cpu.core ? cpu.core : "0");
    } else {
      this.deviceComputerCpuForm.controls['computerCpu'].reset();
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
    this.service.onInfo("updated","updated"); 
  }


}



