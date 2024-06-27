import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractService } from 'src/app/core/shared/services/abstract/abstract.service';
import { IAuthResponse } from '../../user/model/auth-response';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends AbstractService {

  constructor() { super() }

  login(login: FormData): Observable<IAuthResponse> {
    const headers = new HttpHeaders({
      'Accept-Language': this.translateService.currentLanguage
    });
    return this.http.post<IAuthResponse>(`${this.API_URL}/auth/login`, login, { headers: headers });
  }

  saveCredentials(auth: IAuthResponse): void {
    this.authService.saveCredentials(auth);
    this.onInfo('welcome', 'authenticated');
  }

  isLogIn(): Observable<boolean> {
    return this.authService.isLoggedIn;
  }

}
