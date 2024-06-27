import { FormControl } from "@angular/forms";
import { IDeviceComputer, IDeviceComputerDto } from "./device-computer";
import { IDeviceComputerSoftwarePK } from "./pk/device-computer-software-pk";
import { IComputerSoftware, IComputerSoftwareList } from "../../computer/model/computer-software";
import { ISoftwareLicenseKey } from "../../computer/model/software-license-keys";

export interface IDeviceComputerSoftware {
    id: IDeviceComputerSoftwarePK;
    deviceComputer: IDeviceComputerDto;
    software: IComputerSoftware;
    softwareLicenseKey: ISoftwareLicenseKey;
}

export interface IComputerSoftwareView {
    software: IComputerSoftwareList;
    license: string;
}


export interface DeviceComputerSoftwareForm {
    deviceComputer: FormControl<IDeviceComputerDto>;
    software: FormControl<IComputerSoftware>;
    softwareLicenseKey: FormControl<ISoftwareLicenseKey>;
}

export interface DeviceComputerSoftwareAssignForm {
    deviceComputerSoftware: FormControl<IComputerSoftware>;
}