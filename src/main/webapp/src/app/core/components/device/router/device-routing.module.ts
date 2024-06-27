import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceRegisterComponent } from '../pages/device-register/device-register.component';
import { DeviceViewComponent } from '../pages/device-view/device-view.component';
import { DeviceComponent } from '../pages/device/device.component';

const routes: Routes = [
  { path: '', component: DeviceComponent },
  { path: ':id/view', component: DeviceViewComponent },
  { path: 'register', component: DeviceRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
