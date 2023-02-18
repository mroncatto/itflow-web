import { FormControl } from "@angular/forms";
import { IStaff, Staff } from "../../staff/model/staff";
import { IRole, Role } from "./role";

export interface IUser {
    readonly id: string;
    fullName: string;
    avatar: string;
    email: string;
    username: string;
    password: string;
    lastLoginDate: Date;
    joinDate: Date;
    active: boolean;
    nonLocked: boolean;
    password_expired: boolean;
    staff: IStaff;
    role: IRole[];
}

export class User implements IUser {
    id!: string;
    fullName: string;
    avatar: string;
    email: string;
    username: string;
    password: string;
    lastLoginDate: Date;
    joinDate: Date;
    active: boolean;
    nonLocked: boolean;
    password_expired: boolean;
    staff: IStaff;
    role: Role[];

    constructor(fullName: string, avatar: string, email: string, username: string, password: string,
        lastLoginDate: Date, joinDate: Date, active: boolean, nonLocked: boolean, password_expired: boolean, staff: Staff, role: Role[]) {
        this.fullName = fullName;
        this.avatar = avatar;
        this.email = email;
        this.username = username;
        this.password = password;
        this.lastLoginDate = lastLoginDate;
        this.joinDate = joinDate;
        this.active = active;
        this.nonLocked = nonLocked;
        this.password_expired = password_expired;
        this.staff = staff;
        this.role = role;
    }

}

export interface UserForm {
    fullName: FormControl<string>;
    email: FormControl<string>;
    username: FormControl<string>;
    staff: FormControl<IStaff>;
    active: FormControl<boolean>;
    nonLocked: FormControl<boolean>;
}