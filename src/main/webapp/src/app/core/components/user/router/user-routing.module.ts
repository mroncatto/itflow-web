import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';
import { AuthorizationGuard } from 'src/app/core/guards/authorization.guard';
import { ProfileComponent } from '../pages/profile/profile.component';
import { UserAccountComponent } from '../pages/user-account/user-account.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: '', component: UserAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
