import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from '../components/user/enum/role.enum';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';
import { GuardService } from '../shared/services/authentication/guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard  {

  constructor(private service: GuardService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.service.canOpenPage(state.url)) return true;

    this.service.onWarning("attention", "canActivatedDenied");
    this.service.navigate('dashboard');
    return false;
  }
}
