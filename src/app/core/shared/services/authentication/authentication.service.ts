import { EventEmitter, Injectable, Output } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from 'rxjs';
import { Roles } from 'src/app/core/components/user/enum/role.enum';
import { IAuthResponse } from 'src/app/core/components/user/model/auth-response';
import { User } from 'src/app/core/components/user/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private tokenHelper = new JwtHelperService();
  private loggedIn = new BehaviorSubject<boolean>(false);
  @Output() getLoggedInName: EventEmitter<User> = new EventEmitter();

  get isLoggedIn() {
    if (this.getUserFromSessionStorage() && !this.isTokenExpired()) this.loggedIn.next(true);
    return this.loggedIn.asObservable();
  }

  saveCredentials(auth: IAuthResponse): void {
    this.setUserToSessionStorage(auth.user);
    this.setTokenToSessionStorage(auth.access_token);
    this.getLoggedInName.emit(auth.user);
  }

  async removeCredentials(): Promise<void> {
    sessionStorage.clear();
    this.loggedIn.next(false);
  }

  getUserFromSessionStorage(): User | null {
    const user = sessionStorage.getItem('user') as string;
    return JSON.parse(user);
  }

  getRolesFromToken(): Roles[] {
    const token = this.getTokenFromSessionStorage();
    if(token !== null) return this.tokenHelper.decodeToken(token).roles as Roles[];
    return [];
  }

  isTokenExpired(): boolean {
    const token = this.getTokenFromSessionStorage();
    if (token != null) return this.tokenHelper.isTokenExpired(token);
    return true;
  }

  existsToken(): boolean {
    return this.getTokenFromSessionStorage() !== null;
  }

  getTokenFromSessionStorage(): string | null {
    return sessionStorage.getItem('token');
  }

  private setTokenToSessionStorage(token: string): void {
    sessionStorage.setItem('token', token);
  }

  private setUserToSessionStorage(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  hasRole(role: Roles): boolean {
    const roles = this.getRolesFromToken();
    return roles.includes(role);
  }

  hasAnyRole(...listRole : Roles[]): boolean {
    const roles = this.getRolesFromToken();
    for(let rol of roles){
      if(listRole.includes(rol)) return true;
    }
    return false;
  }
}
