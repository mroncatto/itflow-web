import { FormControl } from "@angular/forms";
import { IDepartment } from "../../company/model/department";
import { IDeviceCategory } from "./device-category";
import { IDeviceStaff } from "./device-staff";

export interface IDevice {
    readonly id: number;
    code: string;
    tag: string;
    serialNumber: string;
    description: string;
    hostname: string;
    deviceCategory: IDeviceCategory;
    department: IDepartment;
    active: boolean;
    deviceStaff: IDeviceStaff;
}

export class Device implements IDevice {
    id: number;
    code: string;
    tag: string;
    serialNumber: string;
    description: string;
    hostname: string;
    deviceCategory: IDeviceCategory;
    department: IDepartment;
    active: boolean;
    deviceStaff: IDeviceStaff;

    constructor(id: number, code: string, tag: string, serialNumber: string, description: string,
        hostname: string, deviceCategory: IDeviceCategory, department: IDepartment, active: boolean, deviceStaff: IDeviceStaff) {
        this.id = id;
        this.code = code;
        this.tag = tag;
        this.serialNumber = serialNumber;
        this.description = description;
        this.hostname = hostname;
        this.deviceCategory = deviceCategory;
        this.department = department
        this.active = active;
        this.deviceStaff = deviceStaff;
    }
}

export interface DeviceForm {
    code: FormControl<string>;
    tag: FormControl<string>;
    serialNumber: FormControl<string>;
    description: FormControl<string>;
    hostname: FormControl<string>;
    deviceCategory: FormControl<IDeviceCategory>;
    department: FormControl<IDepartment>;
    active: FormControl<boolean>;
}