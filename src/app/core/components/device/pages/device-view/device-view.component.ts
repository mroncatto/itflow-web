import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractComponent } from 'src/app/core/shared/abstracts/abstract-component';
import { IDevice } from '../../model/device';
import { DeviceService } from '../../services/device.service';

@Component({
  templateUrl: './device-view.component.html',
  styleUrls: ['./device-view.component.css']
})
export class DeviceViewComponent extends AbstractComponent implements OnInit {


  device!: IDevice | null;

  constructor(private service: DeviceService, private activatedRoute: ActivatedRoute, private router: Router) {
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
        complete: () => this.loading = false
      })
    )
  }

  onUpdate(): void {
    if(this.device != null) {
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

}