import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';
import { StaffRegisterComponent } from '../page/staff-register/staff-register.component';
import { StaffComponent } from '../page/staff/staff.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthenticationGuard], children: [
      { path: 'staff', component: StaffComponent },
      { path: 'staff/page/:page', component: StaffComponent },
      { path: 'staff/register', component: StaffRegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
