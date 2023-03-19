import { FormControl } from "@angular/forms";
import { IStaff } from "../../staff/model/staff";
import { IDevice } from "./device";

export interface IDeviceStaff {
    staff: IStaff;
    login: string;
}

export class DeviceStaff implements IDeviceStaff {
    staff: IStaff;
    login: string;


    constructor(staff: IStaff, login: string, device: IDevice) {
        this.staff = staff;
        this.login = login;
    }
}

export interface DeviceStaffForm {
    staff: FormControl<IStaff>
    login: FormControl<string>;
}