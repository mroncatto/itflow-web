import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StaffRoutingModule } from './router/staff-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { StaffComponent } from './page/staff/staff.component';
import { SharedModule } from '../../shared/shared.module';
import { StaffRegisterComponent } from './page/staff-register/staff-register.component';
import { OccupationComponent } from './page/subpage/occupation/occupation.component';


@NgModule({
  declarations: [
    StaffComponent,
    StaffRegisterComponent,
    OccupationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StaffRoutingModule,
    TranslateModule,
    SharedModule
  ]
})
export class StaffModule { }
