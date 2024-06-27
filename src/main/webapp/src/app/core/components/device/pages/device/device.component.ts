import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { IAbstractComponentFilter } from 'src/app/core/shared/abstracts/interface/abstract-component-filter';
import { ICheckboxFilter } from 'src/app/core/shared/abstracts/interface/checkbox-filter';
import { IPaginator } from 'src/app/core/shared/commons/model/paginator';
import { DepartmentCheckboxFilterComponent } from 'src/app/core/shared/components/filters/department-checkbox-filter/department-checkbox-filter.component';
import { DeviceCategoryCheckboxFilterComponent } from 'src/app/core/shared/components/filters/device-category-checkbox-filter/device-category-checkbox-filter.component';
import { SearchInputComponent } from 'src/app/core/shared/components/filters/search-input/search-input.component';
import { DeviceFilter } from '../../filter/device-filter';
import { IDeviceView } from '../../model/device';
import { DeviceService } from '../../services/device.service';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit, OnDestroy, IAbstractComponentFilter {

  loading: boolean = true;
  devices: IDeviceView[] = [];
  errorResponse!: HttpErrorResponse;
  private sub: Subscription[] = [];
  paginator!: IPaginator;
  page: number = 0;
  filter: DeviceFilter = new DeviceFilter();
  messages = TranslateMessages;

  @ViewChild(SearchInputComponent) searchFilterChild!: SearchInputComponent;
  @ViewChild(DepartmentCheckboxFilterComponent) departmentFilterChild!: DepartmentCheckboxFilterComponent;
  @ViewChild(DeviceCategoryCheckboxFilterComponent) categoryFilterChild!: DeviceCategoryCheckboxFilterComponent;


  constructor(private service: DeviceService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub.push(
      this.activatedRoute.queryParams.subscribe(query => {
        if (query['page']) {
          const numPage = this.page = query['page'];
          if (numPage !== null && numPage !== undefined) this.page = numPage;
        }
        this.getDevices();
      })
    )
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  private getDevices(): void {
    this.sub.push(
      this.service.getDevice(this.page, this.filter)
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

  onUpdate(device: IDeviceView): void {
    this.sub.push(
      this.service.getDeviceModal(device).subscribe({
        next: (data) => this.afterUpdate(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  private afterUpdate(device: IDeviceView): void {
    this.devices.forEach(d => {
      if (d.id === device.id) Object.assign(d, device);
    });
  }

  confirmDelete(device: IDeviceView): void {
    this.sub.push(
      this.service.showConfirm(this.messages.WARNING, this.messages.MODAL_DELETE_RECORD, device.hostname).subscribe({
        next: (confirm) => {
          if (confirm) this.onDelete(device)
        },
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private onDelete(device: IDeviceView): void {
    this.sub.push(
      this.service.deleteDevice(device.id).subscribe({
        next: () => this.afterDelete(device),
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private afterDelete(device: IDeviceView): void {
    this.devices.forEach(d => {
      if (d.id === device.id) d.active = false;
    });
    this.service.onInfo(this.messages.INFO_SUCCESS, this.messages.INFO_DEVICE_DELETED);
  }

  filterInput(input: string): void {
    if (input !== null && !this.loading) {
      this.filter.input = input;
      this.loading = true;
      this.getDevices();
    };
  }

  filterDepartment(filter: ICheckboxFilter[]): void {
    this.filter.department = filter;
    this.loading = true;
    this.getDevices();

    //TODO: Testar / Implementar padrao filtro url
    // this.router.navigate([],
    //   {
    //     relativeTo: this.activatedRoute,
    //     queryParams: {departments: '1,2'},
    //     queryParamsHandling: 'merge'
    //   });
  }

  filterDeviceCategory(filter: ICheckboxFilter[]): void {
    this.filter.deviceCategory = filter;
    this.loading = true;
    this.getDevices();
  }

  cleanFilter(): void {
    this.searchFilterChild.clearFilter();
    this.departmentFilterChild.clearSelection();
    this.categoryFilterChild.clearSelection();

    if (this.filter.isFilterNotEmpty()) {
      this.filter.cleanFilter();
      this.refresh();
    }
  }

  refresh(): void {
    this.loading = true;
    this.getDevices();
  }

}
