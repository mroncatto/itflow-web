import { FormControl } from "@angular/forms";
import { IComputerCategory } from "../../computer/model/computer-category";
import { Device } from "./device";
import { IDeviceComputerCpu } from "./device-computer-cpu";

export interface IDeviceComputer {
    readonly id: number;
    device: Device;
    computerCategory: IComputerCategory;
    description: string;
    virtual: boolean;
    computerCpuList: IDeviceComputerCpu[];
}

export class DeviceComputer implements IDeviceComputer {
    readonly id: number;
    device: Device;
    computerCategory: IComputerCategory;
    description: string;
    virtual: boolean;
    computerCpuList: IDeviceComputerCpu[];

    constructor(id: number, device: Device, computerCategory: IComputerCategory, description: string, virtual: boolean, computerCpuList: IDeviceComputerCpu[]) {
        this.id = id;
        this.device = device;
        this.computerCategory = computerCategory;
        this.description = description;
        this.virtual = virtual;
        this.computerCpuList = computerCpuList;
    }
}


export interface DeviceComputerForm {
    computerCategory: FormControl<IComputerCategory>;
    description: FormControl<string>;
    virtual: FormControl<boolean>;
}