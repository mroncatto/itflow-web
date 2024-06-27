import { FormControl } from "@angular/forms";
import { ISoftwareLicense } from "./software-license";
import { IDeviceComputerSoftware } from "../../device/model/device-computer-software";

export interface ISoftwareLicenseKey {
    readonly id: number;
    softwareLicense: ISoftwareLicense;
    key: string;
    volume: number;
    assignedLicenses: IDeviceComputerSoftware[];
}


export interface SoftwareLicenseKeyForm {
    key: FormControl<string>;
    volume: FormControl<number>;
}