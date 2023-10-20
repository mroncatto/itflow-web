import { Injectable, Injector } from '@angular/core';
import { FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { IPaginator } from 'src/app/core/shared/commons/model/paginator';
import { AbstractValidation } from 'src/app/core/shared/commons/validation/abstract-validation';
import { OccupationFormComponent } from 'src/app/core/shared/components/forms/staff/occupation-form/occupation-form.component';
import { StaffFormComponent } from 'src/app/core/shared/components/forms/staff/staff-form/staff-form.component';
import { AbstractService } from 'src/app/core/shared/services/abstract/abstract.service';
import { IDepartment } from '../../company/model/department';
import { StaffFilter } from '../filter/staff-filter';
import { IOccupation, Occupation, OccupationForm } from '../model/occupation';
import { IStaff, Staff } from '../model/staff';
import { OccupationValidation } from '../validation/occupation-validation';
import { StaffValidation } from '../validation/staff-validation';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends AbstractService {

  constructor() { super() }

  // ===================== Endpoints ======================
  getStaff(page: number, filter: StaffFilter): Observable<IPaginator> {
    return this.http.get<IPaginator>(`${this.API_URL}/staff${this.filterStaff(filter, page)}`);
  }

  getAllStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.API_URL}/staff/all`);
  }

  getOccupation(): Observable<Occupation[]> {
    return this.http.get<Occupation[]>(`${this.API_URL}/occupation`);
  }

  getOccupationUsingByStaff(): Observable<Occupation[]> {
    return this.http.get<Occupation[]>(`${this.API_URL}/occupation/filter/staff`);
  }

  updateOccupation(occupation: Occupation): Observable<Occupation> {
    return this.http.put<Occupation>(`${this.API_URL}/occupation`, occupation);
  }

  deleteOccupation(id: number): Observable<Occupation> {
    return this.http.delete<Occupation>(`${this.API_URL}/occupation/${id}`);
  }

  createOccupation(occupation: IOccupation): Observable<Occupation> {
    return this.http.post<Occupation>(`${this.API_URL}/occupation`, occupation);
  }

  getStaffByID(uuid: String): Observable<Staff> {
    return this.http.get<Staff>(`${this.API_URL}/staff/${uuid}`);
  }

  createStaff(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(`${this.API_URL}/staff`, staff);
  }

  updateStaff(staff: Staff): Observable<Staff> {
    return this.http.put<Staff>(`${this.API_URL}/staff`, staff);
  }

  deleteStaff(uuid: string): Observable<Staff> {
    return this.http.delete<Staff>(`${this.API_URL}/staff/${uuid}`);
  }

  // ===================== Modals ======================
  getStaffModal(staff?: IStaff): Subject<IStaff> {
    return this.callModal(StaffFormComponent, staff);
  }

  getOccupationModal(occupation?: IOccupation): Subject<IOccupation> {
    return this.callModal(OccupationFormComponent, occupation);
  }

  // ===================== FormGroups ======================
  getStaffForm(staff?: IStaff): UntypedFormGroup {
    return this.formBuilder.group({
      id: [staff ? staff.id : ''],
      fullName: [staff ? staff.fullName : '', StaffValidation.fullName()],
      email: [staff ? staff.email : '', StaffValidation.email()],
      department: [staff ? staff.department : '', StaffValidation.department()],
      occupation: [staff ? staff.occupation : '', StaffValidation.occupation()],
      active: [true, Validators.required]
    })
  }

  getOccupationForm(occupation?: IOccupation): FormGroup<OccupationForm> {
    return this.formBuilder.group({
      id: [occupation ? occupation.id : ''],
      name: [occupation ? occupation.name : '', OccupationValidation.nameOccupation()],
      active: [true, Validators.required]
    });
  }

  filterStaff(filter: StaffFilter, page: number): string {
    let urlParams: string = "";
 
    urlParams = filter.composePageFilter(urlParams, page);
    urlParams = filter.composeInputFilter(urlParams, filter.input);
    urlParams = filter.composeListParamsFilter(urlParams, "departments", filter.department);
    urlParams = filter.composeListParamsFilter(urlParams, "occupations", filter.occupation);

    return urlParams;
  }

}
