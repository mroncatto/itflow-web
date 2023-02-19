import { FormControl } from "@angular/forms";

export interface IDeviceCategory {
    readonly id: number;
    name: string;
    active: boolean;
}

export class DeviceCategory implements IDeviceCategory {
    id: number;
    name: string;
    active: boolean;

    constructor(id: number, name: string, active: boolean) {
        this.id = id;
        this.name = name;
        this.active = active;
    }
}

export interface DeviceCategoryForm {
    name: FormControl<string>;
    active: FormControl<boolean>;
}