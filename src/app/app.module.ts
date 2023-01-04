import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './core/components/user/user.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginModule } from './core/components/login/login.module';
import { DashboardModule } from './core/components/dashboard/dashboard.module';
import { SharedModule } from './core/shared/shared.module';
import { AuthenticationInterceptor } from './core/middlewares/authentication.interceptor';

import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StaffModule } from './core/components/staff/staff.module';
import { CompanyModule } from './core/components/company/company.module';
import { DefaultRoutingModule } from './core/shared/router/default-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    SharedModule,
    LoginModule,
    UserModule,
    StaffModule,
    CompanyModule,
    DashboardModule,
    DefaultRoutingModule // It should always be the last route module to be imported
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}