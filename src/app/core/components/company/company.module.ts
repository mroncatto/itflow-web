import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './router/company-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CompanyRegisterComponent } from './pages/company-register/company-register.component';
import { CompanyComponent } from './pages/subpages/company/company.component';
import { BranchComponent } from './pages/subpages/branch/branch.component';
import { DepartmentComponent } from './pages/subpages/department/department.component';


@NgModule({
  declarations: [
    CompanyRegisterComponent,
    CompanyComponent,
    BranchComponent,
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
    TranslateModule,

  ]
})
export class CompanyModule { }
