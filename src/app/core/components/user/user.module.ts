import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { UserRoutingModule } from './router/user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAccountFormComponent } from './pages/user-account/modal/user-account-form/user-account-form.component';
import { UserAccountShowComponent } from './pages/user-account/modal/user-account-show/user-account-show.component';


@NgModule({
  declarations: [
    ProfileComponent,
    UserAccountComponent,
    UserAccountFormComponent,
    UserAccountShowComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule
  ]
})
export class UserModule { }
