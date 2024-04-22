import { FormControl } from "@angular/forms";
import { IStaff } from "../../staff/model/staff";
import { IDevice } from "./device";

export interface IDeviceStaff {
    readonly id: number;
    staff: IStaff;
    login: string;
}

export class DeviceStaff implements IDeviceStaff {
    readonly id: number;
    staff: IStaff;
    login: string;


    constructor(id: number, staff: IStaff, login: string, device: IDevice) {
        this.id = id;
        this.staff = staff;
        this.login = login;
    }
}

export interface DeviceStaffForm {
    staff: FormControl<IStaff>
    login: FormControl<string>;
}