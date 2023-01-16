import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guards/authentication.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./core/components/login/login.module').then(m => m.LoginModule) },
  {
    path: '', canActivate: [AuthenticationGuard],
    children: [
      { path: 'dashboard', loadChildren: () => import('./core/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'users', loadChildren: () => import('./core/components/user/user.module').then(m => m.UserModule) },
      { path: 'staff', loadChildren: () => import('./core/components/staff/staff.module').then(m => m.StaffModule) },
      { path: 'company', loadChildren: () => import('./core/components/company/company.module').then(m => m.CompanyModule) },
      { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
