import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastPosition } from '../../commons/enum/toastPosition.enum';
import { ToastType } from '../../commons/enum/toastType.enum';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toast: ToastrService) { }

  showAlert(title: string, msg: string, type: ToastType, position: ToastPosition = ToastPosition.TOP_RIGHT): void {
    switch (type) {
      case 'success':
        this.success(title, msg, position);
        break;
      case 'warning':
        this.warning(title, msg, position);
        break;
      case 'error':
        this.error(title, msg, position);
        break;
      case 'info':
        this.info(title, msg, position);
        break;
      default:
        this.info(title, msg, position);
    }
  }

  success(title:string, msg: string, positionClass: ToastPosition): void {
    this.toast.success(msg, title, {
      positionClass: positionClass,
      disableTimeOut: false
    });
   }

   error(title:string, msg: string, positionClass: ToastPosition): void {
    this.toast.error(msg, title, {
      positionClass: positionClass,
      disableTimeOut: false,
      progressBar: true
    });
   }

   warning(title:string, msg: string, positionClass: ToastPosition): void {
    this.toast.warning(msg, title, {
      positionClass: positionClass,
      disableTimeOut: false
    });
   }

   info(title:string, msg: string, positionClass: ToastPosition): void {
    this.toast.info(msg, title, {
      positionClass: positionClass,
      disableTimeOut: false
    });
   }
}
