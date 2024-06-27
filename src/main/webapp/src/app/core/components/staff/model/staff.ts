import { FormControl } from "@angular/forms";
import { Department, IDepartment } from "../../company/model/department";
import { IUser, User } from "../../user/model/user";
import { IOccupation, Occupation } from "./occupation";

export interface IStaff {
    id: string;
    fullName: string;
    email: string;
    department: IDepartment;
    occupation: IOccupation;
    user: IUser;
    active: boolean;
}

export class Staff implements IStaff {
    id: string;
    fullName: string;
    email: string;
    department: IDepartment;
    occupation: IOccupation;
    user: IUser;
    active: boolean;

    constructor(id: string, fullName: string, email: string, department: IDepartment, occupation: IOccupation
        , user: User, active: boolean) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.department = department;
        this.occupation = occupation;
        this.user = user;
        this.active = active;
    }
}

export interface StaffForm {
    fullName: FormControl<string>;
    email: FormControl<string>;
    department: FormControl<Department>;
    occupation: FormControl<Occupation>;
    active: FormControl<boolean>;
}