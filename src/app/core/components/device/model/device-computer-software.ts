import { FormControl } from "@angular/forms";
import { IDeviceComputer } from "./device-computer";
import { IDeviceComputerSoftwarePK } from "./pk/device-computer-software-pk";
import { IComputerSoftware } from "../../computer/model/computer-software";
import { ISoftwareLicenseKey } from "../../computer/model/software-license-keys";

export interface IDeviceComputerSoftware {
    id: IDeviceComputerSoftwarePK;
    deviceComputer: IDeviceComputer;
    software: IComputerSoftware;
    softwareLicenseKey: ISoftwareLicenseKey;
}


export interface DeviceComputerSoftwareForm {
    deviceComputer: FormControl<IDeviceComputer>;
    software: FormControl<IComputerSoftware>;
    softwareLicenseKey: FormControl<ISoftwareLicenseKey>;
}