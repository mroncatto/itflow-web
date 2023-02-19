import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './router/device-routing.module';
import { DeviceComponent } from './pages/device/device.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DeviceViewComponent } from './pages/device-view/device-view.component';


@NgModule({
  declarations: [
    DeviceComponent,
    DeviceViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DeviceRoutingModule,
    TranslateModule,
    SharedModule
  ]
})
export class DeviceModule { }
