import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription, tap } from 'rxjs';
import { IPaginator } from 'src/app/core/shared/commons/model/paginator';
import { IUser } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit, OnDestroy {

  private sub: Subscription[] = [];
  users: IUser[] = [];
  errorResponse!: HttpErrorResponse;
  selectedUser: IUser | null = null;
  confirmModal!: BsModalRef;
  createUserModal!: BsModalRef;
  loading: boolean = false;
  paginator!: IPaginator;

  constructor(
    private service: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub.push(
      this.activatedRoute.params.subscribe(params => {
        const page: number = params['page'];
        this.loadUsers(page);
      })
    )

  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  isYourAccount(user: IUser): boolean {
    return this.service.getCurrentUser()?.username == user.username;
  }

  private loadUsers(page: number = 0): void {
    this.sub.push(
      this.service.getUsers(page)
        .pipe(
          tap(res => res.content = this.service.sortById(res.content))
        )
        .subscribe({
          next: (data) => {
            this.users = data.content,
              this.paginator = data
          },
          error: (err) => {
            this.service.onHttpError(err);
            this.errorResponse = err;
          }
        })
    );
  }

  // ============================= SHOW USER ============================
  onShowUser(user: IUser): void {
    this.service.onShowUser(user.username);
  }



  // ============================= CREATE USER ============================
  onCreate(): void {
    this.sub.push(
      this.service.getModalUser(true).subscribe({
        next: (user) => this.users.push(user),
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  // ============================= UPDATE USER ============================
  onUpdate(user: IUser): void {
    this.sub.push(
      this.service.getModalUser(true, user).subscribe({
        next: (user) => this.afterUpdate(user),
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private afterUpdate(user: IUser): void {
    this.users.forEach(u => {
      if (u.username === user.username) Object.assign(u, user);
    });
  }


  // ========================== RESET USER PASSWORD ==========================
  confirmResetPassword(user: IUser): void {
    this.sub.push(
      this.service.showConfirm('warning', 'user.resetPassword', user.fullName).subscribe({
        next: (confirm) => { if (confirm) this.onResetPassword(user) },
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private onResetPassword(user: IUser): void {
    this.loading = true;
    this.sub.push(
      this.service.resetPassword(this.service.resetPasswordFormData(user.username)).subscribe({
        next: () => this.afterResetPassword(),
        error: (err) => {
          this.service.onHttpError(err);
          this.loading = false;
        }
      })
    )
  }

  private afterResetPassword(): void {
    this.loading = false;
    this.service.onInfo("successfully", "passwordReseted");
  }

  // ============================= LOCKUNLOCK USER ============================
  confirmLockUnLockUser(user: IUser): void {
    if (user.nonLocked) {
      this.sub.push(
        this.service.showConfirm('warning', 'user.lock', user.fullName).subscribe({
          next: (confirm) => { if (confirm) this.onLockUnLockUser(user) },
          error: (err) => this.service.onHttpError(err)
        })
      )
    } else {
      this.onLockUnLockUser(user)
    }
  }

  private onLockUnLockUser(user: IUser): void {
    this.sub.push(
      this.service.lockUnlockUser(user.username).subscribe({
        next: () => this.afterLockUnLockUser(user),
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private afterLockUnLockUser(user: IUser): void {
    user.nonLocked = !user.nonLocked;
    this.users.forEach((u) => {
      if (u.username === user.username) u = user
    })
    if (user.nonLocked) {
      this.service.onInfo("successfully", "userUnBlocked");
    } else {
      this.service.onInfo("successfully", "userBlocked");
    }

  }

  // ============================= DISABLE USER ============================

  confirmDisable(user: IUser): void {
    this.sub.push(
      this.service.showConfirm('warning', 'user.disable', user.fullName).subscribe({
        next: (confirm) => { if (confirm) this.onDisableUser(user) },
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private onDisableUser(user: IUser): void {
    this.sub.push(
      this.service.disableUser(user.username).subscribe({
        next: () => this.afterDisableUser(user),
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private afterDisableUser(user: IUser): void {
    user.active = false;
    this.users.forEach((u) => {
      if (u.username === user.username) u = user
    })
    this.service.onInfo("successfully", "userDisabled");
  }

  canCreateUsers(): boolean {
    return this.service.canCreateUsers();
  }

  canUpdateUsers(): boolean {
    return this.service.canUpdateUsers();
  }

  canDeleteUsers(): boolean {
    return this.service.canDeleteUsers();
  }

}
