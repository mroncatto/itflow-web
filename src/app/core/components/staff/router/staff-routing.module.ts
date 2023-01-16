import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffRegisterComponent } from '../page/staff-register/staff-register.component';
import { StaffComponent } from '../page/staff/staff.component';

const routes: Routes = [
  { path: '', component: StaffComponent },
  { path: 'page/:page', component: StaffComponent },
  { path: 'register', component: StaffRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
