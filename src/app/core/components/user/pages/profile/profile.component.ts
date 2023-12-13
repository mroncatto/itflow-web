import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUser, User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user!: User;
  errorResponse!: HttpErrorResponse;
  private sub: Subscription[] = [];
  updateMode: boolean = false;
  loadingMode: boolean = false;
  userForm!: UntypedFormGroup;
  passwordForm!: UntypedFormGroup;
  showPassword: boolean = false;
  messages = TranslateMessages;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  getFirstName(): string {
    if (this.user.fullName?.length > 0) {
      return this.user.fullName.split(" ")[0];
    }
    return '';
  }

  getUserRole(): string {
    const roles = this.user.role;
    if (roles.length > 0) {
      roles.sort();
      return roles[0].role;
    }
    return '';
  }

  onProfileUpdate(): void {
    if (this.userForm.valid) {
      this.loadingMode = true;
      this.sub.push(
        this.userService.updateProfile(this.userForm.value).subscribe({
          next: (data) => this.profileChanged(data),
          error: (err) => {
            this.userService.onHttpError(err)
            this.loadingMode = false;
          }
        })
      );
    }
  }

  onPasswordUpdate(): void {
    if (this.passwordForm.valid) {
      this.loadingMode = true;
      this.sub.push(
        this.userService.updatePassword(this.userService.createDataForm(this.passwordForm.value, "repeatpassword")).subscribe({
          next: (data) => this.passwordChanged(),
          error: (err) => {
            this.userService.onHttpError(err)
            this.loadingMode = false;
          }
        })
      )
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  showPasswordChange(): void {
    this.showPassword = !this.showPassword;
  }

  private passwordChanged(): void {
    this.userService.onInfo(this.messages.INFO_UPDATED, this.messages.INFO_PASSWORD_CHANGED);
    this.loadingMode = false;
    this.passwordForm.reset();
    this.updateMode = false;
  }

  private profileChanged(user: IUser): void {
    this.user = user;
    this.userService.onInfo(this.messages.INFO_UPDATED, this.messages.PROFILE_UPDATE_INFO);
    this.loadingMode = false;
    this.updateMode = false;
  }

  private loadUserForm(): void {
    this.userForm = this.userService.getProfileForm(this.user);
  }

  private loadPasswordForm(): void {
    this.passwordForm = this.userService.getPasswordForm();
  }

  private getUserProfile(): void {
    this.sub.push(
      this.userService.findUserByUsername(this.userService.getUserFromCache().username).subscribe({
        next: (data) => {
          this.user = data
        },
        error: (err) => {
          this.userService.onHttpError(err),
            this.errorResponse = err;
        },
        complete: () => {
          this.loadUserForm();
          this.loadPasswordForm(); 
        }
      })
    )
  }

}
