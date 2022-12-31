import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';
import { CompanyRegisterComponent } from '../pages/company-register/company-register.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthenticationGuard], children: [
      { path: 'company/register', component: CompanyRegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
