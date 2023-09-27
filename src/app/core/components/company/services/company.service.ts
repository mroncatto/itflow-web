import { Injectable, Injector } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AbstractService } from 'src/app/core/shared/services/abstract/abstract.service';
import { BranchForm, IBranch } from '../model/branch';
import { CompanyForm, ICompany } from '../model/company';
import { DepartmentForm, IDepartment } from '../model/department';
import { CompanyFormComponent } from 'src/app/core/shared/components/forms/company/company-form/company-form.component';
import { DepartmentFormComponent } from 'src/app/core/shared/components/forms/company/department-form/department-form.component';
import { BranchFormComponent } from 'src/app/core/shared/components/forms/company/branch-form/branch-form.component';
import { CompanyValidation } from '../validation/company-validation';
import { BranchValidation } from '../validation/branch-validation';
import { DepartmentValidation } from '../validation/department-validation';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends AbstractService {

  constructor() { super() }

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

  getDepartmentsUsingByStaff(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(`${this.API_URL}/department/filter/staff`);
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
  getCompanyModal(company?: ICompany): Observable<ICompany> {
    return this.callModal(CompanyFormComponent, company);
  }

  getBranchModal(branch?: IBranch): Observable<IBranch> {
    return this.callModal(BranchFormComponent, branch);
  }

  getDptoModal(depto?: IDepartment): Observable<IDepartment> {
    return this.callModal(DepartmentFormComponent, depto);
  }

  // ===================== FormGroups ======================
  getDepartmentForm(depto?: IDepartment): FormGroup<DepartmentForm> {
    return this.formBuilder.group({
      id: [depto ? depto.id : ''],
      name: [depto ? depto.name : '', DepartmentValidation.nameDept()],
      branch: [depto ? depto.branch : '', DepartmentValidation.branch()],
      active: [true, Validators.required]
    });
  }

  getCompanyForm(company?: ICompany): FormGroup<CompanyForm> {
    return this.formBuilder.group({
      id: [company ? company.id : ''],
      name: [company ? company.name : '', CompanyValidation.nameCompany()],
      document: [company ? company.document : '', CompanyValidation.document()],
      active: [true, Validators.required]
    });
  }

  getBranchForm(branch?: IBranch): FormGroup<BranchForm> {
    return this.formBuilder.group({
      id: [branch ? branch.id : ''],
      name: [branch ? branch.name : '', BranchValidation.nameBranch()],
      company: [branch ? branch.company : '', BranchValidation.company()],
      active: [true, Validators.required]
    });
  }

}
