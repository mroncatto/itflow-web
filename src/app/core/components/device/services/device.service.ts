import { Injectable, Injector } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { IPaginator } from 'src/app/core/shared/commons/model/paginator';
import { DeviceCategoryFormComponent } from 'src/app/core/shared/components/forms/device/device-category-form/device-category-form.component';
import { DeviceFormComponent } from 'src/app/core/shared/components/forms/device/device-form/device-form.component';
import { DeviceStaffFormComponent } from 'src/app/core/shared/components/forms/device/device-staff-form/device-staff-form.component';
import { AbstractService } from 'src/app/core/shared/services/abstract/abstract.service';
import { DeviceFilter } from '../filter/device-filter';
import { DeviceForm, IDevice, IDeviceView } from '../model/device';
import { DeviceCategoryForm, IDeviceCategory } from '../model/device-category';
import { DeviceStaffForm, IDeviceStaff } from '../model/device-staff';
import { DeviceCategoryValidation } from '../validation/device-category-validation';
import { DeviceValidation } from '../validation/device-validation';
import { DeviceComputerFormComponent } from 'src/app/core/shared/components/forms/device/device-computer-form/device-computer-form.component';
import { DeviceComputerForm, IDeviceComputer } from '../model/device-computer';
import { DeviceComputerValidation } from '../validation/device-computer-validation';
import { IDeviceComputerCpu } from '../model/device-computer-cpu';
import { IDeviceComputerMemory } from '../model/device-computer-memory';
import { IDeviceComputerStorage } from '../model/device-computer-storage';
import { IDeviceComputerSoftware } from '../model/device-computer-software';

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends AbstractService {

  constructor() { super() }

  // ===================== Endpoints ======================
  getDevice(page: number, filter: DeviceFilter): Observable<IPaginator> {
    return this.http.get<IPaginator>(`${this.API_URL}/device${this.filterDevice(filter, page)}`);
  }

  getDeviceById(id: number): Observable<IDeviceView> {
    return this.http.get<IDeviceView>(`${this.API_URL}/device/${id}`);
  }

  getDeviceCategories(): Observable<IDeviceCategory[]> {
    return this.http.get<IDeviceCategory[]>(`${this.API_URL}/device/category`);
  }

  getDeviceCategoriesUsingByDevice(): Observable<IDeviceCategory[]> {
    return this.http.get<IDeviceCategory[]>(`${this.API_URL}/device/category/filter/device`);
  }

  getDeviceStaff(id: number): Observable<IDeviceStaff> {
    return this.http.get<IDeviceStaff>(`${this.API_URL}/device/staff/${id}`);
  }

  getDeviceComputer(id: number): Observable<IDeviceComputer> {
    return this.http.get<IDeviceComputer>(`${this.API_URL}/device/computer/${id}`);
  }

  createDevice(device: IDeviceView): Observable<IDeviceView> {
    return this.http.post<IDeviceView>(`${this.API_URL}/device`, device);
  }

  updateDeviceStaff(id: number, deviceStaff: IDeviceStaff): Observable<IDeviceStaff> {
    return this.http.put<IDeviceStaff>(`${this.API_URL}/device/staff/${id}`, deviceStaff);
  }

  updateDeviceComputer(id: number, deviceComputer: IDeviceComputer): Observable<IDeviceComputer> {
    return this.http.put<IDeviceComputer>(`${this.API_URL}/device/computer/${id}`, deviceComputer);
  }

  updateDeviceComputerCpu(id: number, deviceComputerCpu: IDeviceComputerCpu): Observable<IDeviceView> {
    return this.http.put<IDeviceView>(`${this.API_URL}/device/computer/${id}/cpu`, deviceComputerCpu);
  }

  deleteDeviceComputerCpu(id: number, cpuId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/device/computer/${id}/cpu/${cpuId}`);
  }

  updateDeviceComputerMemory(id: number, deviceComputerMemory: IDeviceComputerMemory): Observable<IDeviceView> {
    return this.http.put<IDeviceView>(`${this.API_URL}/device/computer/${id}/memory`, deviceComputerMemory);
  }

  deleteDeviceComputerMemory(id: number, memoryId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/device/computer/${id}/memory/${memoryId}`);
  }

  updateDeviceComputerStorage(id: number, deviceComputerStorage: IDeviceComputerStorage): Observable<IDeviceView> {
    return this.http.put<IDeviceView>(`${this.API_URL}/device/computer/${id}/storage`, deviceComputerStorage);
  }

  updateDeviceComputerSoftware(id: number, deviceComputerSoftware: IDeviceComputerSoftware): Observable<IDeviceView> {
    return this.http.put<IDeviceView>(`${this.API_URL}/device/computer/${id}/software`, deviceComputerSoftware);
  }

  deleteDeviceComputerStorage(id: number, storageId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/device/computer/${id}/storage/${storageId}`);
  }

  updateDevice(device: IDeviceView): Observable<IDeviceView> {
    return this.http.put<IDeviceView>(`${this.API_URL}/device`, device);
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

  deleteDeviceCategory(id: number): Observable<IDeviceCategory> {
    return this.http.delete<IDeviceCategory>(`${this.API_URL}/device/category/${id}`);
  }

  deleteDeviceStaff(id: number): Observable<IDeviceView> {
    return this.http.delete<IDeviceView>(`${this.API_URL}/device/staff/${id}`);
  }

  deleteDeviceComputer(id: number): Observable<IDeviceView> {
    return this.http.delete<IDeviceView>(`${this.API_URL}/device/computer/${id}`);
  }


  // ===================== Modals =========================
  getDeviceModal(device?: IDeviceView): Subject<IDeviceView> {
    return this.callModal(DeviceFormComponent, device);
  }

  getDeviceStaffModal(device?: IDeviceView): Subject<IDeviceView> {
    return this.callModal(DeviceStaffFormComponent, device);
  }

  getDeviceComputerModal(device?: IDeviceView): Subject<IDeviceView> {
    return this.callModal(DeviceComputerFormComponent, device, { backdrop: 'static', class: 'modal-xl' });
  }

  getDeviceCategoryModal(deviceCategory?: IDeviceCategory): Subject<IDeviceCategory> {
    return this.callModal(DeviceCategoryFormComponent, deviceCategory);
  }

  // ===================== FormGroups ======================
  getDeviceForm(device?: IDeviceView): FormGroup<DeviceForm> {
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

  getDeviceStaffForm(deviceStaff?: IDeviceStaff): FormGroup<DeviceStaffForm> {
    return this.formBuilder.group({
      staff: [deviceStaff ? deviceStaff.staff : '', Validators.required],
      login: [deviceStaff ? deviceStaff.login : '']
    })
  }

  getDeviceComputerForm(deviceComputer?: IDeviceComputer): FormGroup<DeviceComputerForm> {
    return this.formBuilder.group({
      computerCategory: [deviceComputer ? deviceComputer.computerCategory : "", Validators.required],
      description: [deviceComputer ? deviceComputer.description : "", DeviceComputerValidation.description()],
      virtual: [deviceComputer ? deviceComputer.virtual : false, Validators.required]
    })
  }

  getDeviceCategoryForm(deviceCategory?: IDeviceCategory): FormGroup<DeviceCategoryForm> {
    return this.formBuilder.group({
      id: [deviceCategory ? deviceCategory.id : ''],
      name: [deviceCategory ? deviceCategory.name : '', DeviceCategoryValidation.nameCategory()],
      active: [deviceCategory ? deviceCategory.active : true, Validators.required]
    });
  }

  filterDevice(filter: DeviceFilter, page: number): string {
    let urlParams: string = "";

    urlParams = filter.composePageFilter(urlParams, page);
    urlParams = filter.composeInputFilter(urlParams, filter.input);
    urlParams = filter.composeListParamsFilter(urlParams, "departments", filter.department);
    urlParams = filter.composeListParamsFilter(urlParams, "categories", filter.deviceCategory);
    return urlParams;

  }


}
