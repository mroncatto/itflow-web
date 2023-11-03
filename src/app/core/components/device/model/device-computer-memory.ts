import { FormControl } from "@angular/forms";
import { IComputerMemory } from "../../computer/model/computer-memory";
import { IDeviceComputer } from "./device-computer";

export interface IDeviceComputerMemory {
    readonly id: number;
    deviceComputer: IDeviceComputer;
    computerMemory: IComputerMemory;
    modules: number;
}

export interface DeviceComputerMemoryForm {
    deviceComputer: FormControl<IDeviceComputer>;
    computerMemory: FormControl<IComputerMemory>;
    modules: FormControl<number>;
}