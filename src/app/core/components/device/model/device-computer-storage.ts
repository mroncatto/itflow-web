import { FormControl } from "@angular/forms";
import { IComputerStorage } from "../../computer/model/computer-storage";
import { IDeviceComputer } from "./device-computer";

export interface IDeviceComputerStorage {
    readonly id: number;
    deviceComputer: IDeviceComputer;
    computerStorage: IComputerStorage;
    size: number;
}


export interface DeviceComputerStorageForm {
    deviceComputer: FormControl<IDeviceComputer>;
    computerStorage: FormControl<IComputerStorage>;
    size: FormControl<number>;
}