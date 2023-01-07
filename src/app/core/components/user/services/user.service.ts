import { Injectable, Injector } from '@angular/core';
import { AbstractControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { IPaginator } from 'src/app/core/shared/commons/model/paginator';
import { AbstractService } from 'src/app/core/shared/services/abstract/abstract.service';
import { IRole, Role } from '../model/role';
import { IUser, User } from '../model/user';
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

  getUsers(page: number): Observable<IPaginator> {
    return this.http.get<IPaginator>(`${this.API_URL}/user/page/${page}`);
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
  getUserForm(user?: IUser): UntypedFormGroup {
    return this.formBuilder.group({
      fullName: ['', UserValidation.fullName()],
      email: ['', UserValidation.email()],
      username: ['', UserValidation.username()],
      staff: null,
      active: [true],
      nonLocked: [true]
    })
  }

  getUserFormValue(user: IUser): Object {
    return ({
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      staff: user.staff ? user.staff : null,
      active: user.active,
      nonLocked: user.nonLocked
    });
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
  getModalUser(mainView: boolean, user?: IUser): Observable<IUser> {
    return this.callModal(UserAccountFormComponent, mainView, user);
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

}
