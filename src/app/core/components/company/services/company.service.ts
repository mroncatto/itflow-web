import { Injectable, Injector, TemplateRef } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, Subject, switchMap, take } from 'rxjs';
import { AbstractValidation } from 'src/app/core/shared/commons/validation/abstract-validation';
import { AbstractService } from 'src/app/core/shared/services/abstract/abstract.service';
import { IBranch } from '../model/branch';
import { ICompany } from '../model/company';
import { IDepartment } from '../model/department';
import { CompanyFormComponent } from 'src/app/core/shared/components/forms/company/company-form/company-form.component';
import { DepartmentFormComponent } from 'src/app/core/shared/components/forms/company/department-form/department-form.component';
import { BranchFormComponent } from 'src/app/core/shared/components/forms/company/branch-form/branch-form.component';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends AbstractService {

  constructor(injector: Injector) { super(injector) }

  // ===================== Endpoints =========================
  getCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(`${this.API_URL}/company`);
  }

  getBranches(): Observable<IBranch[]> {
    return this.http.get<IBranch[]>(`${this.API_URL}/branch`);
  }

  createBranch(branch: IBranch): Observable<IBranch> {
    return this.http.post<IBranch>(`${this.API_URL}/branch`, branch);
  }

  updateBranch(branch: IBranch): Observable<IBranch> {
    return this.http.put<IBranch>(`${this.API_URL}/branch`, branch);
  }

  deleteBranch(branch: IBranch): Observable<IBranch> {
    return this.http.delete<IBranch>(`${this.API_URL}/branch/${branch.id}`);
  }

  getDepartments(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(`${this.API_URL}/department`);
  }

  updateDepartment(dpto: IDepartment): Observable<IDepartment> {
    return this.http.post<IDepartment>(`${this.API_URL}/department`, dpto);
  }

  deleteDepartment(dpto: IDepartment): Observable<IDepartment> {
    return this.http.delete<IDepartment>(`${this.API_URL}/department/${dpto.id}`);
  }

  createDepartment(department: IDepartment): Observable<IDepartment> {
    return this.http.post<IDepartment>(`${this.API_URL}/department`, department);
  }

  createCompany(company: ICompany): Observable<ICompany> {
    return this.http.post<ICompany>(`${this.API_URL}/company`, company);
  }

  updateCompany(company: ICompany): Observable<ICompany> {
    return this.http.put<ICompany>(`${this.API_URL}/company`, company);
  }

  deleteCompany(id: number): Observable<ICompany> {
    return this.http.delete<ICompany>(`${this.API_URL}/company/${id}`);
  }


  // ===================== Modals =========================
  getCompanyModal(mainView: boolean, company?: ICompany): Observable<ICompany> {
    return this.callModal(CompanyFormComponent, mainView, company);
  }

  getBranchModal(mainView: boolean, branch?: IBranch): Observable<IBranch> {
    return this.callModal(BranchFormComponent, mainView, branch);
  }

  getDptoModal(mainView: boolean, depto?: IDepartment): Observable<IDepartment> {
    return this.callModal(DepartmentFormComponent, mainView, depto);
  }

  // ===================== FormGroups ======================
  getDepartmentForm(depto?: IDepartment): UntypedFormGroup {
    return this.formBuilder.group({
      id: [depto ? depto.id : ''],
      name: [depto ? depto.name : '', AbstractValidation.description(5)],
      branch: [depto ? depto.branch : '', Validators.required]
    });
  }

  getCompanyForm(company?: ICompany): UntypedFormGroup {
    return this.formBuilder.group({
      id: [company ? company.id : ''],
      name: [company ? company.name : '', AbstractValidation.description(5)],
      document: [company ? company.document : '', AbstractValidation.description(5)],
      active: [true, Validators.required]
    });
  }

  getBranchForm(branch?: IBranch): UntypedFormGroup {
    return this.formBuilder.group({
      id: [branch ? branch.id : ''],
      name: [branch ? branch.name : '', AbstractValidation.description(5)],
      company: [branch ? branch.company : '', Validators.required],
      active: [true, Validators.required]
    });
  }

}
