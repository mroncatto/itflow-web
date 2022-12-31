import { IDepartment } from "../../company/model/department";
import { IUser, User } from "../../user/model/user";
import { IOccupation } from "./occupation";

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