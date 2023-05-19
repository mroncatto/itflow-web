import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputerRegisterComponent } from '../page/computer-register/computer-register.component';

const routes: Routes = [
  { path: 'register', component: ComputerRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComputerRoutingModule { }
