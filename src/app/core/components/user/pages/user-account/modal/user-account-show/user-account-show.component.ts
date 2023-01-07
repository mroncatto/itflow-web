import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { IRole } from '../../../../model/role';
import { IUser } from '../../../../model/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-account-show',
  templateUrl: './user-account-show.component.html',
  styleUrls: ['./user-account-show.component.css']
})
export class UserAccountShowComponent implements OnInit {

  user!: IUser;
  roles: IRole[] = [];
  roleControl = new UntypedFormControl("", Validators.required);
  loading: boolean = false;
  private sub: Subscription[] = [];

  constructor(
    private modal: BsModalRef,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  loadUser(username: string): void {
    this.sub.push(
      this.userService.findUserByUsername(username).subscribe({
        next: (data) => {
          this.user = data;
          this.getRoles();
        },
        error: (err) => {
          this.userService.onHttpError(err);
          this.closeModal();
        }
      })
    )
  }

  getFirstName(): string {
    if (this.user.fullName?.length > 0) {
      return this.user.fullName.split(" ")[0];
    }
    return '';
  }

  closeModal() {
    this.modal.hide();
  }


  // ============================= USER ROLES ============================
  addRole(): void {
    if (this.roleControl.valid) {
      this.sub.push(
        this.userService.updateUserRole(this.user, this.roleControl.value).subscribe({
          next: (data) => {         
            this.user.role = data.role;
            this.refreshListRoles();   
            this.roleControl.reset("");                
            this.userService.onInfo('updated', 'userRoleUpdated');
          },
          error: (err) => {
            this.userService.onHttpError(err);
            this.closeModal();
          }
        })
      );
    }
  }

  removeRole(role: IRole): void {
    this.sub.push(
      this.userService.updateUserRole(this.user, role, true).subscribe({
        next: (data) => {
          this.user.role = data.role;
          this.roles.push(role);
          this.refreshListRoles();     
          this.roleControl.reset("");   
          this.userService.onInfo('updated', 'userRoleUpdated');
        },
        error: (err) => {
          this.userService.onHttpError(err);
          this.closeModal();
        }
      })
    );
  }

  private getRoles(): void {
    this.sub.push(
      this.userService.getRoles().subscribe({
        next: (data) => this.loadRoles(data), 
        error: (err) => this.userService.onHttpError(err)
      })
    )
  }

  private loadRoles(roles: IRole[]): void {
    this.roles = roles;
    this.refreshListRoles();
  }

  private refreshListRoles(): void {
      this.roles = this.roles
      .filter(r => !this.hasRol(r))
      .sort((a, b) => a.role > b.role ? 1 : -1);
  }

  private hasRol(rol: IRole): boolean {
    let hasRole: boolean = false;
    this.user.role.forEach((r) => {
      if(r.id === rol.id) hasRole = true;
    });

    return hasRole;
  }

}
