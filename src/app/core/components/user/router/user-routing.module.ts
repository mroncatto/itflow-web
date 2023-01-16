import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';
import { AuthorizationGuard } from 'src/app/core/guards/authorization.guard';
import { ProfileComponent } from '../pages/profile/profile.component';
import { UserAccountComponent } from '../pages/user-account/user-account.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthenticationGuard], children: [
      { path: 'profile', component: ProfileComponent },
      {
        path: 'users', canActivate: [AuthorizationGuard],
        children: [
          {
            path: '', component: UserAccountComponent
          },
          {
            path: 'page/:page', component: UserAccountComponent
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
