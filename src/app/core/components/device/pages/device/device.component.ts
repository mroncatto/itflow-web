import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { IPaginator } from 'src/app/core/shared/commons/model/paginator';
import { IDevice } from '../../model/device';
import { DeviceService } from '../../services/device.service';

@Component({
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  devices: IDevice[] = [];
  errorResponse!: HttpErrorResponse;
  private sub: Subscription[] = [];
  paginator!: IPaginator;
  page: number = 0;

  constructor(private service: DeviceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub.push(
      this.activatedRoute.params.subscribe(params => {
        const numPage: number = params['page'];
        if (numPage !== null && numPage !== undefined) this.page = numPage;
        this.getDevices();
      })
    )
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  private getDevices(): void {
    this.sub.push(
      this.service.getDevice(this.page)
        .pipe(
          tap(res => res.content = this.service.sortByField(res.content, 'hostname'))
        )
        .subscribe({
          next: (data) => {
            this.devices = data.content;
            this.paginator = data;
          },
          error: (err) => {
            this.service.onHttpError(err);
            this.errorResponse = err;
          },
          complete: () => this.loading = false
        })
    );
  }


  onCreate(): void {
    this.sub.push(
      this.service.getDeviceModal().subscribe({
        next: (data) => this.devices.push(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onUpdate(device: IDevice): void {
    this.sub.push(
      this.service.getDeviceModal(device).subscribe({
        next: (data) => this.afterUpdate(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  private afterUpdate(device: IDevice): void {
    this.devices.forEach(d => {
      if (d.id === device.id) Object.assign(d, device);
    });
  }

  confirmDelete(device: IDevice): void {
    this.sub.push(
      this.service.showConfirm('warning', 'delete', device.hostname).subscribe({
        next: (confirm) => {
          if (confirm) this.onDelete(device)
        },
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private onDelete(device: IDevice): void {
    this.sub.push(
      this.service.deleteDevice(device.id).subscribe({
        next: () => this.afterDelete(device),
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private afterDelete(device: IDevice): void {
    this.devices.forEach(d => {
      if (d.id === device.id) d.active = false;
    });
    this.service.onInfo("successfully", "deviceDeleted");
  }



}
