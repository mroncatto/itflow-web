import { FormControl } from "@angular/forms";
import { IDeviceComputer, IDeviceComputerSample } from "./device-computer";
import { IDeviceComputerSoftwarePK } from "./pk/device-computer-software-pk";
import { IComputerSoftware, IComputerSoftwareList } from "../../computer/model/computer-software";
import { ISoftwareLicenseKey } from "../../computer/model/software-license-keys";

export interface IDeviceComputerSoftware {
    id: IDeviceComputerSoftwarePK;
    deviceComputer: IDeviceComputer;
    software: IComputerSoftware;
    softwareLicenseKey: ISoftwareLicenseKey;
}

export interface IComputerSoftwareView {
    software: IComputerSoftwareList;
    license: string;
}


export interface DeviceComputerSoftwareForm {
    deviceComputer: FormControl<IDeviceComputer>;
    software: FormControl<IComputerSoftware>;
    softwareLicenseKey: FormControl<ISoftwareLicenseKey>;
}