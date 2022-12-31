import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastPosition } from '../../commons/enum/toastPosition.enum';
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
  formBuilder: FormBuilder;

  readonly API_URL = environment.API_URL;
  constructor(injector: Injector) {
    this.alertService = injector.get(AlertService);
    this.translateService = injector.get(TranslateConfigService);
    this.router = injector.get(Router);
    this.modalService = injector.get(BsModalService);
    this.authService = injector.get(AuthenticationService);
    this.http = injector.get(HttpClient);
    this.formBuilder = injector.get(FormBuilder);
  }

  // ------------------ Router --------------------------------
  //TODO: Criar interface para parametros dinamicos
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
  callModal(template: any, mainView?: boolean, model?: any): Subject<any> {
    const bsModalRef: BsModalRef = this.modalService.show(template, { backdrop: 'static' });
    bsModalRef.content.mainView = mainView;
    if(model) bsModalRef.content?.payload(model);
    return (<any>bsModalRef.content).result;
  }

  // ------------------ Toast Alerts --------------------------------
  onSuccess(title: string, message: string): void {
    this.showAlert(this.translate(`app.success.${title}`), this.translate(`app.success.${message}`), ToastType.SUCCESS);
  }

  onWarning(title: string, message: string): void {
    this.showAlert(this.translate(`app.warning.${title}`), this.translate(`app.warning.${message}`), ToastType.WARNING);
  }

  onInfo(title: string, message: string): void {
    this.showAlert(this.translate(`app.info.${title}`), this.translate(`app.info.${message}`), ToastType.INFO);
  }

  onError(title: string, message: string): void {
    this.showAlert(this.translate(`app.info.${title}`), this.translate(`app.info.${message}`), ToastType.ERROR);
  }

  onHttpError(err: HttpErrorResponse): void {
    this.processHttpError(err);
  }

  private processHttpError(err: HttpErrorResponse): void {
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
    const title = this.translateService.instant(`api.warning.${err?.error}`);
    const msg = this.translateService.instant(`api.warning.${err?.message}`);
    this.showAlert(title, (err.error === 'BAD_REQUEST') ? err.message : msg, ToastType.WARNING);
  }

  private authenticationRequest(err: any) {
    const title = this.translateService.instant(`api.error.${err?.error}`);
    const msg = this.translateService.instant(`api.error.${err?.message}`);
    this.showAlert(title, msg, ToastType.ERROR);
  }

  private unauthorized(err: any) {
    if (this.authService.isTokenExpired()) {
      this.modalService.hide();
      this.router.navigate(['/login']);
      this.onWarning("sessionExpired", "loginRequired");
    } else {
      const title = this.translateService.instant(`api.error.${err?.error}`);
      const msg = this.translateService.instant(`api.error.UNAUTHORIZED`);
      this.showAlert(title, msg, ToastType.ERROR);
    }

  }

  private notFound(err: any) {
    const title = this.translateService.instant(`api.warning.${err?.error}`);
    const msg = this.translateService.instant(`api.warning.${err?.message}`);
    this.showAlert(title, msg, ToastType.WARNING);
  }

  private internalServerError(err: any) {
    const title = this.translateService.instant(`api.error.unknown`);
    const msg = this.translateService.instant(`api.error.${err?.message}`);
    this.showAlert(title, msg, ToastType.ERROR);
  }

  private undefinedError() {
    const title = this.translateService.instant(`api.error.unknown`);
    const msg = this.translateService.instant(`api.error.unknown`);
    this.showAlert(title, msg, ToastType.ERROR);
  }

  private showAlert(title: string, msg: string, type: ToastType, position: ToastPosition = ToastPosition.TOP_RIGHT): void {
    switch (type) {
      case 'success':
        this.alertService.success(title, msg, position);
        break;
      case 'warning':
        this.alertService.warning(title, msg, position);
        break;
      case 'error':
        this.alertService.error(title, msg, position);
        break;
      case 'info':
        this.alertService.info(title, msg, position);
        break;
      default:
        this.alertService.info(title, msg, position);
    }
  }

  // ------------------ Translate --------------------------------
  translate(value: string, param?: string): string {
    return this.translateService.instant(value, param)
  }
}
