import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractService } from 'src/app/core/shared/services/abstract/abstract.service';
import { ComputerCategoryForm, IComputerCategory } from '../model/computer-category';
import { FormGroup, Validators } from '@angular/forms';
import { ComputerCategoryValidation } from '../validation/computer-category-validation';
import { ComputerCategoryFormComponent } from 'src/app/core/shared/components/forms/computer/computer-category-form/computer-category-form.component';
import { ComputerCpuForm, IComputerCpu } from '../model/computer-cpu';
import { ComputerMemoryForm, IComputerMemory } from '../model/computer-memory';
import { ComputerStorageForm, IComputerStorage } from '../model/computer-storage';
import { ComputerCpuValidation } from '../validation/computer-cpu-validation';
import { ComputerMemoryValidation } from '../validation/computer-memory-validation';
import { ComputerStorageValidation } from '../validation/computer-storage-validation';
import { ComputerCpuFormComponent } from 'src/app/core/shared/components/forms/computer/computer-cpu-form/computer-cpu-form.component';
import { ComputerMemoryFormComponent } from 'src/app/core/shared/components/forms/computer/computer-memory-form/computer-memory-form.component';
import { ComputerStorageFormComponent } from 'src/app/core/shared/components/forms/computer/computer-storage-form/computer-storage-form.component';
import { DeviceComputerCpuForm, IDeviceComputerCpu } from '../../device/model/device-computer-cpu';
import { DeviceComputerForm, IDeviceComputer, IDeviceComputerDto } from '../../device/model/device-computer';
import { DeviceComputerCpuValidation } from '../../device/validation/device-computer-cpu-validation';
import { DeviceComputerMemoryForm, IDeviceComputerMemory } from '../../device/model/device-computer-memory';
import { DeviceComputerMemoryValidation } from '../../device/validation/device-computer-memory-validation';
import { DeviceComputerStorageForm, IDeviceComputerStorage } from '../../device/model/device-computer-storage';
import { DeviceComputerStorageValidation } from '../../device/validation/device-computer-storage-validation';
import { ComputerSoftwareForm, IComputerSoftware, IComputerSoftwareList } from '../model/computer-software';
import { ComputerSoftwareFormComponent } from 'src/app/core/shared/components/forms/computer/computer-software-form/computer-software-form.component';
import { ComputerSoftwareValidation } from '../validation/computer-software-validation';
import { ISoftwareLicense, SoftwareLicenseForm } from '../model/software-license';
import { SoftwareLicenseValidation } from '../validation/software-license-validation';
import { ComputerLicenseFormComponent } from 'src/app/core/shared/components/forms/computer/computer-license-form/computer-license-form.component';
import { LicenseKeyComponent } from 'src/app/core/shared/components/forms/license/license-key/license-key.component';
import { ISoftwareLicenseKey, SoftwareLicenseKeyForm } from '../model/software-license-keys';
import { DeviceComputerSoftwareAssignForm, DeviceComputerSoftwareForm, IDeviceComputerSoftware } from '../../device/model/device-computer-software';
import { LicenseKeyAssignComponent } from 'src/app/core/shared/components/forms/license/license-key-assign/license-key-assign.component';

@Injectable({
  providedIn: 'root'
})
export class ComputerService extends AbstractService {

  constructor() { super() }

  // ===================== Endpoints =========================
  getCategories(): Observable<IComputerCategory[]> {
    return this.http.get<IComputerCategory[]>(`${this.API_URL}/computer/category`);
  }

  createComputerCategory(computerCategory: IComputerCategory): Observable<IComputerCategory> {
    return this.http.post<IComputerCategory>(`${this.API_URL}/computer/category`, computerCategory);
  }

  updateComputerCategory(computerCategory: IComputerCategory): Observable<IComputerCategory> {
    return this.http.put<IComputerCategory>(`${this.API_URL}/computer/category`, computerCategory);
  }

  deleteComputerCategory(id: number): Observable<IComputerCategory> {
    return this.http.delete<IComputerCategory>(`${this.API_URL}/computer/category/${id}`);
  }

  getComputerCPU(): Observable<IComputerCpu[]> {
    return this.http.get<IComputerCpu[]>(`${this.API_URL}/computer/cpu`);
  }

  getComputerCpuAutoComplete(filter: string): Observable<IComputerCpu[]> {
    return this.http.get<IComputerCpu[]>(`${this.API_URL}/computer/cpu/autocomplete?filter=${filter}`);
  }

  getComputerMemoryAutoComplete(filter: string): Observable<IComputerMemory[]> {
    return this.http.get<IComputerMemory[]>(`${this.API_URL}/computer/memory/autocomplete?filter=${filter}`);
  }

  getComputerStorageAutoComplete(filter: string): Observable<IComputerStorage[]> {
    return this.http.get<IComputerStorage[]>(`${this.API_URL}/computer/storage/autocomplete?filter=${filter}`);
  }

  getComputerSoftwareAutoComplete(filter: string): Observable<IComputerSoftware[]> {
    return this.http.get<IComputerSoftware[]>(`${this.API_URL}/computer/software/autocomplete?filter=${filter}`);
  }

  getDeviceComputerAutoComplete(filter: string): Observable<IDeviceComputerDto[]> {
    return this.http.get<IDeviceComputerDto[]>(`${this.API_URL}/device/computer/autocomplete?filter=${filter}`);
  }

  createComputerCPU(computerCPU: IComputerCpu): Observable<IComputerCpu> {
    return this.http.post<IComputerCpu>(`${this.API_URL}/computer/cpu`, computerCPU);
  }

  updateComputerCPU(computerCPU: IComputerCpu): Observable<IComputerCpu> {
    return this.http.put<IComputerCpu>(`${this.API_URL}/computer/cpu`, computerCPU);
  }

  deleteComputerCPU(id: number): Observable<IComputerCpu> {
    return this.http.delete<IComputerCpu>(`${this.API_URL}/computer/cpu/${id}`);
  }

  getComputerMemory(): Observable<IComputerMemory[]> {
    return this.http.get<IComputerMemory[]>(`${this.API_URL}/computer/memory`);
  }

  getComputerSoftware(): Observable<IComputerSoftware[]> {
    return this.http.get<IComputerSoftware[]>(`${this.API_URL}/computer/software`);
  }

  getSoftwareLicense(): Observable<ISoftwareLicense[]> {
    return this.http.get<ISoftwareLicense[]>(`${this.API_URL}/computer/license`);
  }

  getSoftwareLicenseById(id: number): Observable<ISoftwareLicense> {
    return this.http.get<ISoftwareLicense>(`${this.API_URL}/computer/license/${id}`);
  }

  getSoftwareLicenseKey(id: number): Observable<ISoftwareLicenseKey> {
    return this.http.get<ISoftwareLicenseKey>(`${this.API_URL}/computer/license/key/${id}`);
  }

  createComputerMemory(computerMemory: IComputerMemory): Observable<IComputerMemory> {
    return this.http.post<IComputerMemory>(`${this.API_URL}/computer/memory`, computerMemory);
  }

  createComputerSoftware(computerSoftware: IComputerSoftware): Observable<IComputerSoftware> {
    return this.http.post<IComputerSoftware>(`${this.API_URL}/computer/software`, computerSoftware);
  }

  createSoftwareLicense(softwareLicense: ISoftwareLicense): Observable<ISoftwareLicense> {
    return this.http.post<ISoftwareLicense>(`${this.API_URL}/computer/license`, softwareLicense);
  }

  addLicenseKey(id: number, key: ISoftwareLicenseKey): Observable<ISoftwareLicense> {
    return this.http.post<ISoftwareLicense>(`${this.API_URL}/computer/license/${id}/key`, key);
  }

  addLicenseKeyAssign(id: number, deviceComputerSoftware: IDeviceComputerSoftware): Observable<IDeviceComputerSoftware> {
    return this.http.post<IDeviceComputerSoftware>(`${this.API_URL}/computer/license/key/${id}/assign`, deviceComputerSoftware);
  }

  updateComputerMemory(computerMemory: IComputerMemory): Observable<IComputerMemory> {
    return this.http.put<IComputerMemory>(`${this.API_URL}/computer/memory`, computerMemory);
  }

  updateComputerSoftware(computerSoftware: IComputerSoftware): Observable<IComputerSoftware> {
    return this.http.put<IComputerSoftware>(`${this.API_URL}/computer/software`, computerSoftware);
  }

  updateSoftwareLicense(softwareLicense: ISoftwareLicense): Observable<ISoftwareLicense> {
    return this.http.put<ISoftwareLicense>(`${this.API_URL}/computer/license`, softwareLicense);
  }

  deleteComputerMemory(id: number): Observable<IComputerMemory> {
    return this.http.delete<IComputerMemory>(`${this.API_URL}/computer/memory/${id}`);
  }

  deleteComputerSoftware(id: number): Observable<IComputerSoftware> {
    return this.http.delete<IComputerSoftware>(`${this.API_URL}/computer/software/${id}`);
  }

  removeLicenseKey(id: number, key: ISoftwareLicenseKey): Observable<ISoftwareLicense> {
    return this.http.put<ISoftwareLicense>(`${this.API_URL}/computer/license/${id}/key`, key);
  }

  deleteSoftwareLicense(id: number): Observable<ISoftwareLicense> {
    return this.http.delete<ISoftwareLicense>(`${this.API_URL}/computer/license/${id}`);
  }

  getComputerStorage(): Observable<IComputerStorage[]> {
    return this.http.get<IComputerStorage[]>(`${this.API_URL}/computer/storage`);
  }

  createComputerStorage(computerStorage: IComputerStorage): Observable<IComputerStorage> {
    return this.http.post<IComputerStorage>(`${this.API_URL}/computer/storage`, computerStorage);
  }

  updateComputerStorage(computerStorage: IComputerStorage): Observable<IComputerStorage> {
    return this.http.put<IComputerStorage>(`${this.API_URL}/computer/storage`, computerStorage);
  }

  deleteComputerStorage(id: number): Observable<IComputerStorage> {
    return this.http.delete<IComputerStorage>(`${this.API_URL}/computer/storage/${id}`);
  }


  // ===================== FormGroups ======================
  getComputerCategoryForm(category?: IComputerCategory): FormGroup<ComputerCategoryForm> {
    return this.formBuilder.group({
      id: [category ? category.id : ''],
      name: [category ? category.name : '', ComputerCategoryValidation.nameCategory()],
      active: [true, Validators.required]
    })
  }

  getComputerCpuForm(cpu?: IComputerCpu): FormGroup<ComputerCpuForm> {
    return this.formBuilder.group({
      id: [cpu ? cpu.id : ''],
      brandName: [cpu ? cpu.brandName : '', ComputerCpuValidation.brandName()],
      model: [cpu ? cpu.model : '', ComputerCpuValidation.model()],
      generation: [cpu ? cpu.generation : '', ComputerCpuValidation.generation()],
      socket: [cpu ? cpu.socket : '', ComputerCpuValidation.socket()],
      core: [cpu ? cpu.core : '', ComputerCpuValidation.core()],
      thread: [cpu ? cpu.thread : '', ComputerCpuValidation.thread()],
      frequency: [cpu ? cpu.frequency : '', ComputerCpuValidation.frequency()],
      fsb: [cpu ? cpu.fsb : '', ComputerCpuValidation.fsb()],
      active: [true, Validators.required]
    })
  }

  getComputerMemoryForm(memory?: IComputerMemory): FormGroup<ComputerMemoryForm> {
    return this.formBuilder.group({
      id: [memory ? memory.id : ''],
      brandName: [memory ? memory.brandName : '', ComputerMemoryValidation.brandName()],
      type: [memory ? memory.type : '', ComputerMemoryValidation.type()],
      frequency: [memory ? memory.frequency : '', ComputerMemoryValidation.frequency()],
      size: [memory ? memory.size : '', ComputerMemoryValidation.size()],
      active: [true, Validators.required]
    })
  }

  getComputerSoftwareForm(software?: IComputerSoftware): FormGroup<ComputerSoftwareForm> {
    return this.formBuilder.group({
      id: [software ? software.id : ''],
      name: [software ? software.name : '', ComputerSoftwareValidation.software_name()],
      developer: [software ? software.developer : '', ComputerSoftwareValidation.developer()],
      active: [true, Validators.required]
    })
  }

  getSoftwareLicenseForm(license?: ISoftwareLicense): FormGroup<SoftwareLicenseForm> {
    const { id, description, code, expireAt, software } = license || {} as ISoftwareLicense;

    return this.formBuilder.group({
      id: [id || ''],
      description: [description || '', SoftwareLicenseValidation.desc()],
      code: [code || '', SoftwareLicenseValidation.code()],
      expireAt: [expireAt ? new Date(expireAt) : '', SoftwareLicenseValidation.expireAt()],
      software: [software || '', SoftwareLicenseValidation.software()],
      active: [true, Validators.required]
    });
  }

  getLicenseKeyForm(): FormGroup<SoftwareLicenseKeyForm> {
    return this.formBuilder.group({
      key: ['', Validators.required],
      volume: [0, SoftwareLicenseValidation.volume()]
    });
  }

  getLicenseKeyAssignForm(): FormGroup<DeviceComputerSoftwareAssignForm> {
    return this.formBuilder.group({
      deviceComputer: ['', Validators.required]
    });
  }

  getComputerStorageForm(storage?: IComputerStorage): FormGroup<ComputerStorageForm> {
    return this.formBuilder.group({
      id: [storage ? storage.id : ''],
      brandName: [storage ? storage.brandName : '', ComputerStorageValidation.brandName()],
      transferRate: [storage ? storage.transferRate : '', ComputerStorageValidation.transferRate()],
      type: [storage ? storage.type : '', ComputerStorageValidation.type()],
      active: [true, Validators.required]
    })
  }

  getDeviceComputerCpuForm(deviceComputer: IDeviceComputer): FormGroup<DeviceComputerCpuForm> {
    return this.formBuilder.group({
      deviceComputer: [deviceComputer],
      computerCpu: ['', DeviceComputerCpuValidation.computerCpu()],
      core: ['', DeviceComputerCpuValidation.core()],
    })
  }

  getDeviceComputerMemoryForm(deviceComputer: IDeviceComputer): FormGroup<DeviceComputerMemoryForm> {
    return this.formBuilder.group({
      deviceComputer: [deviceComputer],
      computerMemory: ['', DeviceComputerMemoryValidation.computerMemory()],
      modules: ['', DeviceComputerMemoryValidation.modules()],
    })
  }

  getDeviceComputerStorageForm(deviceComputer: IDeviceComputer): FormGroup<DeviceComputerStorageForm> {
    return this.formBuilder.group({
      deviceComputer: [deviceComputer],
      computerStorage: ['', DeviceComputerStorageValidation.computerStorage()],
      size: ['', DeviceComputerStorageValidation.size()],
    })
  }

  getDeviceComputerSoftwareForm(deviceComputer: IDeviceComputer): FormGroup<DeviceComputerSoftwareForm> {
    return this.formBuilder.group({
      deviceComputer: [deviceComputer],
      software: ['', Validators.required],
      softwareLicenseKey: [],
    })
  }

  // ===================== Modals =========================
  getComputerCategoryModal(category?: IComputerCategory): Observable<IComputerCategory> {
    return this.callModal(ComputerCategoryFormComponent, category);
  }

  getComputerCpuModal(cpu?: IComputerCpu): Observable<IComputerCpu> {
    return this.callModal(ComputerCpuFormComponent, cpu);
  }

  getComputerMemoryModal(memory?: IComputerMemory): Observable<IComputerMemory> {
    return this.callModal(ComputerMemoryFormComponent, memory);
  }

  getComputerSoftwareModal(software?: IComputerSoftware): Observable<IComputerSoftware> {
    return this.callModal(ComputerSoftwareFormComponent, software);
  }

  getComputerStorageModal(storage?: IComputerStorage): Observable<IComputerStorage> {
    return this.callModal(ComputerStorageFormComponent, storage);
  }

  getSoftwareLicenseModal(license?: ISoftwareLicense): Observable<ISoftwareLicense> {
    return this.callModal(ComputerLicenseFormComponent, license);
  }

  getLicenseKeyModal(license?: ISoftwareLicense): Observable<ISoftwareLicense> {
    return this.callModal(LicenseKeyComponent, license, { backdrop: 'static', class: 'modal-lg' });
  }

  getKeyAssignModal(key: ISoftwareLicenseKey): Observable<ISoftwareLicenseKey> {
    return this.callModal(LicenseKeyAssignComponent, key, { class: 'modal-lg' });
  }

}
