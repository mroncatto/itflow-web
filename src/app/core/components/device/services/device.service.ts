import { Injectable, Injector } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { IPaginator } from 'src/app/core/shared/commons/model/paginator';
import { DeviceCategoryFormComponent } from 'src/app/core/shared/components/forms/device/device-category-form/device-category-form.component';
import { DeviceFormComponent } from 'src/app/core/shared/components/forms/device/device-form/device-form.component';
import { AbstractService } from 'src/app/core/shared/services/abstract/abstract.service';
import { DeviceFilter } from '../filter/device-filter';
import { DeviceForm, IDevice } from '../model/device';
import { DeviceCategoryForm, IDeviceCategory } from '../model/device-category';
import { DeviceCategoryValidation } from '../validation/device-category-validation';
import { DeviceValidation } from '../validation/device-validation';

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends AbstractService {

  constructor(injector: Injector) { super(injector) }

  // ===================== Endpoints ======================
  getDevice(page: number, filter: DeviceFilter): Observable<IPaginator> {
    return this.http.get<IPaginator>(`${this.API_URL}/device/page/${page}${this.filterDevice(filter)}`);
  }

  getDeviceCategories(): Observable<IDeviceCategory[]> {
    return this.http.get<IDeviceCategory[]>(`${this.API_URL}/device/category`);
  }

  getDeviceCategoriesUsingByDevice(): Observable<IDeviceCategory[]> {
    return this.http.get<IDeviceCategory[]>(`${this.API_URL}/device/category/filter/device`);
  }

  createDevice(device: IDevice): Observable<IDevice> {
    return this.http.post<IDevice>(`${this.API_URL}/device`, device);
  }

  updateDevice(device: IDevice): Observable<IDevice> {
    return this.http.put<IDevice>(`${this.API_URL}/device`, device);
  }

  createDeviceCategory(deviceCategory: IDeviceCategory): Observable<IDeviceCategory> {
    return this.http.post<IDeviceCategory>(`${this.API_URL}/device/category`, deviceCategory);
  }

  updateDeviceCategory(deviceCategory: IDeviceCategory): Observable<IDeviceCategory> {
    return this.http.put<IDeviceCategory>(`${this.API_URL}/device/category`, deviceCategory);
  }

  deleteDevice(id: number): Observable<IDevice> {
    return this.http.delete<IDevice>(`${this.API_URL}/device/${id}`);
  }


  // ===================== Modals =========================
  getDeviceModal(device?: IDevice): Subject<IDevice> {
    return this.callModal(DeviceFormComponent, device);
  }

  getDeviceCategoryModal(deviceCategory?: IDeviceCategory): Subject<IDeviceCategory> {
    return this.callModal(DeviceCategoryFormComponent, deviceCategory);
  }

  // ===================== FormGroups ======================
  getDeviceForm(device?: IDevice): FormGroup<DeviceForm> {
    return this.formBuilder.group({
      id: [device ? device.id : ''],
      code: [device ? device.code : ''],
      tag: [device ? device.tag : ''],
      serialNumber: [device ? device.serialNumber : '', DeviceValidation.serialNumber()],
      description: [device ? device.description : '', DeviceValidation.description()],
      hostname: [device ? device.hostname : '', DeviceValidation.hostname()],
      deviceCategory: [device ? device.deviceCategory : '', DeviceValidation.deviceCategory()],
      department: [device ? device.department : '', DeviceValidation.department()],
      active: [device ? device.active : true]
    })
  }

  getDeviceCategoryForm(deviceCategory?: IDeviceCategory): FormGroup<DeviceCategoryForm> {
    return this.formBuilder.group({
      id: [deviceCategory ? deviceCategory.id : ''],
      name: [deviceCategory ? deviceCategory.name : '', DeviceCategoryValidation.nameCategory()],
      active: [deviceCategory ? deviceCategory.active : true, Validators.required]
    });
  }

  filterDevice(filter: DeviceFilter): string {
    let urlParams: string = "";

    urlParams = filter.composeInputFilter(urlParams, filter.input);
    urlParams = filter.composeListParamsFilter(urlParams, "departments", filter.department);
    urlParams = filter.composeListParamsFilter(urlParams, "categories", filter.deviceCategory);

    return urlParams;

  }


}
