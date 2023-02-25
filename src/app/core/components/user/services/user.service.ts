import { Injectable, Injector } from '@angular/core';
import { AbstractControl, FormGroup, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { IPaginator } from 'src/app/core/shared/commons/model/paginator';
import { AbstractService } from 'src/app/core/shared/services/abstract/abstract.service';
import { UserFilter } from '../filter/user-filter';
import { IRole, Role } from '../model/role';
import { IUser, User, UserForm } from '../model/user';
import { UserAccountFormComponent } from '../pages/user-account/modal/user-account-form/user-account-form.component';
import { UserAccountShowComponent } from '../pages/user-account/modal/user-account-show/user-account-show.component';
import { UserValidation } from '../validation/user-validation';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService {

  constructor(injector: Injector) { super(injector) }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.API_URL}/user`, user);
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.API_URL}/user/${user.username}`, user);
  }

  updateUserRole(user: IUser, role: IRole, remove?: boolean): Observable<IUser> {
    remove ? user.role = user.role.filter(r => r.id !== role.id) : user.role.push(role);
    return this.http.put<IUser>(`${this.API_URL}/user/${user.username}/role`, user.role);
  }

  getCurrentUser(): IUser | null {
    return this.authService.getUserFromSessionStorage();
  }

  getUserFromCache(): IUser {
    return this.authService.getUserFromSessionStorage() as IUser;
  }

  getUsers(page: number, filter: UserFilter): Observable<IPaginator> {
    return this.http.get<IPaginator>(`${this.API_URL}/user/page/${page}${this.filterUser(filter)}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/user`);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.API_URL}/user/role`);
  }

  resetPassword(form: FormData): Observable<any> {
    return this.http.post(`${this.API_URL}/user/resetpassword`, form);
  }

  disableUser(username: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/user/${username}`);
  }

  lockUnlockUser(username: string): Observable<any> {
    return this.http.put(`${this.API_URL}/user/lockunlock/${username}`, null);
  }

  findUserByUsername(username: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.API_URL}/user/${username}`);
  }

  updatePassword(form: FormData): Observable<any> {
    return this.http.put(`${this.API_URL}/user/updatepassword`, form);
  }

  updateProfile(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.API_URL}/user/profile`, user);
  }

  // ===================== FormGroups ======================
  getUserForm(user?: IUser): FormGroup<UserForm> {
    return this.formBuilder.group({
      fullName: [ user ? user.fullName : '', UserValidation.fullName()],
      email: [ user ? user.email : '', UserValidation.email()],
      username: [ user ? user.username : '', UserValidation.username()],
      staff:  user ? user.staff : null,
      active: [ user ? user.active : true],
      nonLocked: [ user ? user.nonLocked : true]
    })
  }

  getProfileForm(user: IUser): UntypedFormGroup {
    return this.formBuilder.group({
      fullName: [user.fullName, UserValidation.fullName()],
      email: [user.email, UserValidation.email()]
    })
  }

  getPasswordForm(): UntypedFormGroup {
    return this.formBuilder.group({
      oldPassword: ['', UserValidation.required()],
      newPassword: ['', UserValidation.password()],
      repeatpassword: ['', UserValidation.required()]
    }, { validators: this.checkPasswords });
  }

  private checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('newPassword')?.value;
    let confirmPass = group.get('repeatpassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }


  // ===================== FormGroups ======================
  getModalUser(user?: IUser): Observable<IUser> {
    return this.callModal(UserAccountFormComponent, user);
  }

  onShowUser(username: string): void {
    const bsModalRef: BsModalRef = this.modalService.show(UserAccountShowComponent, {
      class: 'modal-dialog-centered'
    });
    bsModalRef.content.loadUser(username);
  }

  // ======================== Form Data ====================
  resetPasswordFormData(username: string): FormData {
    const form: FormData = new FormData();
    form.append("username", username);
    return form;
  }

  filterUser(filter: UserFilter): string {
    let urlParams: string = "";
    if (filter.hasInput()) urlParams = urlParams.concat("?filter=", filter.input);
    return urlParams;
  }

}
