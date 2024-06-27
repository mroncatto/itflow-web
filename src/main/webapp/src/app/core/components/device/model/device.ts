import { FormControl } from "@angular/forms";
import { IDepartment } from "../../company/model/department";
import { IDeviceCategory } from "./device-category";
import { IDeviceStaff } from "./device-staff";
import { IDeviceComputer } from "./device-computer";
import { IDeviceComputerCpu } from "./device-computer-cpu";

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
    hasStaff: boolean;
    hasComputer: boolean;
}

export interface IDeviceView {
    readonly id: number;
    code: string;
    tag: string;
    serialNumber: string;
    description: string;
    hostname: string;
    deviceCategory: IDeviceCategory;
    department: IDepartment;
    active: boolean;
    hasStaff: boolean;
    hasComputer: boolean;
    deviceStaff: IDeviceStaff;
    deviceComputer: IDeviceComputer;
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