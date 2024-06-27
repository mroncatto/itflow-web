import { Injectable, Injector } from '@angular/core';
import { AbstractService } from '../abstract/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService extends AbstractService {

  constructor() {
    super();
  }

  alertExpiredToken() {
    this.onWarning("sessionExpired", "loginRequired");
  }

  isTokenExpired(): boolean {
    return this.authService.isTokenExpired();
  }

  existsToken(): boolean {
    return this.authService.existsToken();
  }

  async removeCredentials(): Promise<void> {
    this.authService.removeCredentials();
  }
}
