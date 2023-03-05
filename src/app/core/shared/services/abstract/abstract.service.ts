import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { StaffFilter } from 'src/app/core/components/staff/filter/staff-filter';
import { Roles } from 'src/app/core/components/user/enum/role.enum';
import { UserFilter } from 'src/app/core/components/user/filter/user-filter';
import { environment } from 'src/environments/environment';
import { ToastType } from '../../commons/enum/toastType.enum';
import { ConfirmComponent } from '../../components/modal/confirm/confirm.component';
import { AlertService } from '../alert/alert.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { TranslateConfigService } from '../translate/translate-config.service';

@Injectable({
  providedIn: 'root'
})
export class AbstractService {

  protected translateService: TranslateConfigService;
  protected router: Router;
  protected authService: AuthenticationService;
  protected http: HttpClient;
  protected modalService: BsModalService;
  alertService: AlertService;
  formBuilder: UntypedFormBuilder;

  readonly API_URL = environment.API_URL;
  constructor(injector: Injector) {
    this.alertService = injector.get(AlertService);
    this.translateService = injector.get(TranslateConfigService);
    this.router = injector.get(Router);
    this.modalService = injector.get(BsModalService);
    this.authService = injector.get(AuthenticationService);
    this.http = injector.get(HttpClient);
    this.formBuilder = injector.get(UntypedFormBuilder);
  }

  // ------------------ Lists --------------------------------
  sortById(list: any[]): any[] {
    return list.sort((a, b) => a.id < b.id ? 1 : -1);
  }

  sortByField(list: any[], field: string): any[] {
    return list.sort((a, b) => a[field].localeCompare(b[field]));
  }
  // ------------------ Router --------------------------------
  navigate(url: string, redirect: string = '', ...params: string[]): void {
    if (redirect && redirect.length > 0 && redirect !== '/login') {
      this.router.navigate([url], { queryParams: { redirect: redirect.replace('/', '') } });
    } else {
      this.router.navigate([url]);
    }
  }

  createDataForm(form: any, ...deleteParams: string[]): FormData {
    const formData: FormData = new FormData();
    deleteParams.forEach(p => {
      delete form[p]
    });
    for (var key in form) {
      formData.append(key, form[key]);
    }
    return formData;
  }

  // ------------------ Modal Confirm --------------------------------
  showConfirm(title: string, message: string, param?: string): Subject<boolean> {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.message = message;
    if (param) bsModalRef.content.param = param;

    return (<ConfirmComponent>bsModalRef.content).confirmResult;
  }

  // ------------------ Modal Forms --------------------------------
  callModal(template: any, model?: any): Subject<any> {
    const bsModalRef: BsModalRef = this.modalService.show(template, { backdrop: 'static' });
    if (model) bsModalRef.content?.payload(model);
    return (<any>bsModalRef.content).result;
  }

  // ------------------ Toast Alerts --------------------------------
  onSuccess(title: string, message: string): void {
    this.alertService.showAlert(this.translate(`alert.success.${title}`), this.translate(`alert.success.${message}`), ToastType.SUCCESS);
  }

  onWarning(title: string, message: string): void {
    this.alertService.showAlert(this.translate(`alert.warning.${title}`), this.translate(`alert.warning.${message}`), ToastType.WARNING);
  }

  onInfo(title: string, message: string): void {
    this.alertService.showAlert(this.translate(`alert.info.${title}`), this.translate(`alert.info.${message}`), ToastType.INFO);
  }

  onError(title: string, message: string): void {
    this.alertService.showAlert(this.translate(`alert.error.${title}`), this.translate(`alert.error.${message}`), ToastType.ERROR);
  }

  onHttpError(err: HttpErrorResponse): void {
    this.processHttpError(err);
  }

  processHttpError(err: HttpErrorResponse): void {
    switch (err.status) {
      case 400:
        this.badRequestError(err.error);
        break;
      case 401:
        this.authenticationRequest(err.error);
        break;
      case 403:
        this.unauthorized(err.error);
        break;
      case 404:
        this.notFound(err.error);
        break;
      case 500:
        this.internalServerError(err.error);
        break;
      default:
        this.undefinedError();
    }
  }

  private badRequestError(err: any) {
    const title = this.translateService.instant(`alert.warning.${err?.error}`);
    const msg = this.translateService.instant(`alert.warning.${err?.message}`);
    this.alertService.showAlert(title, (err.error === 'BAD_REQUEST') ? err.message : msg, ToastType.WARNING);
  }

  private authenticationRequest(err: any) {
    const title = this.translateService.instant(`alert.error.${err?.error}`);
    const msg = this.translateService.instant(`alert.error.${err?.message}`);
    this.alertService.showAlert(title, msg, ToastType.ERROR);
  }

  private notFound(err: any) {
    const title = this.translateService.instant(`alert.warning.${err?.error}`);
    const msg = this.translateService.instant(`alert.warning.${err?.message}`);
    this.alertService.showAlert(title, msg, ToastType.WARNING);
  }

  private internalServerError(err: any) {
    const title = this.translateService.instant(`alert.error.unknown`);
    const msg = this.translateService.instant(`alert.error.${err?.message}`);
    this.alertService.showAlert(title, msg, ToastType.ERROR);
  }

  private undefinedError() {
    const title = this.translateService.instant(`alert.error.unknown`);
    const msg = this.translateService.instant(`alert.error.unknown`);
    this.alertService.showAlert(title, msg, ToastType.ERROR);
  }

  private unauthorized(err: any) {
    if (this.authService.isTokenExpired()) {
      this.modalService.hide();
      this.router.navigate(['/login']);
      this.onWarning("sessionExpired", "loginRequired");
    } else {
      const title = this.translateService.instant(`alert.error.${err?.error}`);
      const msg = this.translateService.instant(`alert.error.UNAUTHORIZED`);
      this.alertService.showAlert(title, msg, ToastType.ERROR);
    }
  }

  // ------------------ Translate --------------------------------
  translate(value: string, param?: string): string {
    return this.translateService.instant(value, param)
  }

  // ------------------ Security Policies Access -----------------
  //-------------------------- USERS -----------------------------

  canOpenUsers(): boolean {
    return this.authService.hasAnyRole(Roles.ADMIN, Roles.MANAGER, Roles.COORDINATOR, Roles.HELPDESK, Roles.SUPPORT);
  }

  canCreateUsers(): boolean {
    return this.authService.hasAnyRole(Roles.ADMIN);
  }

  canUpdateUsers(): boolean {
    return this.authService.hasAnyRole(Roles.ADMIN, Roles.HELPDESK);
  }

  canDeleteUsers(): boolean {
    return this.authService.hasAnyRole(Roles.ADMIN);
  }

  canOpenDevices(): boolean {
    return this.authService.hasAnyRole(Roles.ADMIN, Roles.MANAGER, Roles.COORDINATOR, Roles.HELPDESK, Roles.SUPPORT);
  }

  canCreateCompanyRecords(): boolean {
    return this.authService.hasAnyRole(Roles.ADMIN, Roles.MANAGER, Roles.COORDINATOR, Roles.HELPDESK, Roles.SUPPORT);
  }

  canCreateStaffRecords(): boolean {
    return this.authService.hasAnyRole(Roles.ADMIN, Roles.MANAGER, Roles.COORDINATOR, Roles.HELPDESK, Roles.SUPPORT);
  }

  canCreateDeviceRecords(): boolean {
    return this.authService.hasAnyRole(Roles.ADMIN, Roles.MANAGER, Roles.COORDINATOR, Roles.HELPDESK, Roles.SUPPORT);
  }

  //-------------------------- Pages -----------------------------
  canOpenPage(page: string): boolean {

    switch (page) {
      case "/users":
        return this.canOpenUsers();
    }

    return false;
  }

}
