import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationFieldComponent } from './components/commons/validation-field/validation-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmComponent } from './components/modal/confirm/confirm.component';
import { PaginatorComponent } from './components/commons/paginator/paginator.component';
import { CompanyFormComponent } from './components/forms/company/company-form/company-form.component';
import { DepartmentFormComponent } from './components/forms/company/department-form/department-form.component';
import { OccupationFormComponent } from './components/forms/staff/occupation-form/occupation-form.component';
import { StaffFormComponent } from './components/forms/staff/staff-form/staff-form.component';
import { BranchFormComponent } from './components/forms/company/branch-form/branch-form.component';


@NgModule({
  declarations: [
    ValidationFieldComponent,
    ConfirmComponent,
    StaffFormComponent,
    PaginatorComponent,
    DepartmentFormComponent,
    OccupationFormComponent,
    CompanyFormComponent,
    BranchFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
    
  ],
  exports: [
    ValidationFieldComponent,
    ConfirmComponent,
    StaffFormComponent,
    PaginatorComponent,
    DepartmentFormComponent,
    OccupationFormComponent,
    CompanyFormComponent,
    BranchFormComponent
  ]
})
export class SharedModule { }
