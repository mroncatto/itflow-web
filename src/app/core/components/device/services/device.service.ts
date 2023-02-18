import { Injectable, Injector } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { IPaginator } from 'src/app/core/shared/commons/model/paginator';
import { DeviceFormComponent } from 'src/app/core/shared/components/forms/device/device-form/device-form.component';
import { AbstractService } from 'src/app/core/shared/services/abstract/abstract.service';
import { IDevice } from '../model/device';
import { IDeviceCategory } from '../model/device-category';
import { DeviceValidation } from '../validation/device-validation';

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends AbstractService {

  constructor(injector: Injector) { super(injector) }

  // ===================== Endpoints ======================
  getDevice(page: number): Observable<IPaginator> {
    return this.http.get<IPaginator>(`${this.API_URL}/device/page/${page}`);
  }

  getDeviceCategories(): Observable<IDeviceCategory[]> {
    return this.http.get<IDeviceCategory[]>(`${this.API_URL}/device/category`);
  }

  createDevice(device: IDevice): Observable<IDevice> {
    return this.http.post<IDevice>(`${this.API_URL}/device`, device);
  }

  updateDevice(device: IDevice): Observable<IDevice> {
    return this.http.put<IDevice>(`${this.API_URL}/device`, device);
  }


  // ===================== Modals =========================
  getModalDevice(mainView?: boolean, device?: IDevice): Subject<IDevice> {
    return this.callModal(DeviceFormComponent, mainView, device);
  }

  // ===================== FormGroups ======================
  getDeviceForm(device?: IDevice): UntypedFormGroup {
    return this.formBuilder.group({
      id: [device ? device.id : ''],
      code: [device ? device.code : 0],
      tag: [device ? device.tag : ''],
      serialNumber: [device ? device.serialNumber : ''],
      description: [device ? device.description : '', DeviceValidation.description()],
      hostname: [device ? device.hostname : '', DeviceValidation.hostname()],
      deviceCategory: [device ? device.deviceCategory : '', Validators.required],
      department: [device ? device.department : '', Validators.required],
      active: [device ? device.active : true]
    })
  }


}
