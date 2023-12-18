import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComputerRoutingModule } from './router/computer-routing.module';
import { ComputerRegisterComponent } from './page/computer-register/computer-register.component';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryComponent } from './page/subpages/category/category.component';
import { CpuComponent } from './page/subpages/cpu/cpu.component';
import { MemoryComponent } from './page/subpages/memory/memory.component';
import { StorageComponent } from './page/subpages/storage/storage.component';
import { SoftwareComponent } from './page/subpages/software/software.component';


@NgModule({
  declarations: [
    ComputerRegisterComponent,
    CategoryComponent,
    CpuComponent,
    MemoryComponent,
    StorageComponent,
    SoftwareComponent
  ],
  imports: [
    CommonModule,
    ComputerRoutingModule,
    TranslateModule
  ]
})
export class ComputerModule { }
