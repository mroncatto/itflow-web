import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY, Subject, Subscription, switchMap, take } from 'rxjs';
import { IStaff, Staff } from 'src/app/core/components/staff/model/staff';
import { StaffService } from 'src/app/core/components/staff/services/staff.service';
import { AbstractUser } from 'src/app/core/shared/abstracts/abstract-user';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';
import { IUser } from '../../../../model/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-account-form',
  templateUrl: './user-account-form.component.html',
  styleUrls: ['./user-account-form.component.css']
})
export class UserAccountFormComponent extends AbstractUser implements OnInit, OnDestroy, IAbstractModelForms<IUser> {

  user!: IUser;
  staff: Staff[] = [];
  result!: Subject<IUser>;
  userForm!: FormGroup;

  constructor(
    private modal: BsModalRef,
    private service: UserService,
    private staffService: StaffService
  ) { super() }

  ngOnInit(): void {
    this.result = new Subject();
    this.userForm = this.service.getUserForm();
    this.getStaff();
  }

  payload(user: IUser): void {
    if(user) {
      this.user = user;
      this.userForm.setValue(this.service.getUserFormValue(user));
      this.userForm.controls['username'].disable();
      this.userForm.controls['active'].disable();
      this.userForm.controls['nonLocked'].disable();
    }
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  save(): void {
    if (this.userForm.valid) {
      this.loading = true;
      if (this.user && this.user?.username) {
        this.sub.push(
          this.service.updateUser(this.userForm.getRawValue()).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.service.onHttpError(err)
          })
        )
      } else {
        this.sub.push(
          this.service.createUser(this.userForm.value as IUser).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      }
    } else {
      //this.userForm.markAsTouched(); FIXME: Works only on Angular 14
      this.service.onWarning("badRequest", "fillFieldsRequired");
    }
  }

  onSave(user: IUser): void {
    this.result.next(user);
    if (this.user?.username) {
      this.service.onSuccess("updated", "updated");
    } else {
      this.service.onSuccess("created", "created");
    }
    this.closeModal();
  }

  onError(err: HttpErrorResponse): void {
    this.loading = false;
    this.service.onHttpError(err);
  }

  // ============================= STAFF ============================
  private getStaff(): void {
    this.sub.push(
      this.staffService.getAllStaff().subscribe({
        next: (data) => this.staff = data.filter(s => (!s.user) || this.isCurrentUser(s.user)),
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private isCurrentUser(user: IUser): boolean {
    return (this.user) && (this.user.username === user.username);
  }


  onCreateStaff(): void {
    this.sub.push(
      this.staffService.getModalStaff(false, this.userForm.value as IStaff).subscribe({
        next: (data) => this.afterCreateStaff(data),
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private afterCreateStaff(staff: IStaff): void {
    this.staff.push(staff);
    this.userForm.get('staff')?.setValue(staff);
  }

  closeModal() {
    this.modal.hide();
  }

}
