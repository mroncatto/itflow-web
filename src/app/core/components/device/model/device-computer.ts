import { FormControl } from "@angular/forms";
import { IComputerCategory } from "../../computer/model/computer-category";
import { Device } from "./device";
import { IDeviceComputerCpu } from "./device-computer-cpu";
import { IDeviceComputerMemory } from "./device-computer-memory";
import { IDeviceComputerStorage } from "./device-computer-storage";

export interface IDeviceComputer {
    readonly id: number;
    device: Device;
    computerCategory: IComputerCategory;
    description: string;
    virtual: boolean;
    computerCpuList: IDeviceComputerCpu[];
    computerMemoryList: IDeviceComputerMemory[];
    computerStorageList: IDeviceComputerStorage[];
}

export class DeviceComputer implements IDeviceComputer {
    readonly id: number;
    device: Device;
    computerCategory: IComputerCategory;
    description: string;
    virtual: boolean;
    computerCpuList: IDeviceComputerCpu[] = [];
    computerMemoryList: IDeviceComputerMemory[] = [];
    computerStorageList: IDeviceComputerStorage[] = [];

    constructor(id: number, device: Device, computerCategory: IComputerCategory, description: string, 
        virtual: boolean) {
        this.id = id;
        this.device = device;
        this.computerCategory = computerCategory;
        this.description = description;
        this.virtual = virtual;
        this.computerCpuList = [];
        this.computerMemoryList = [];
        this.computerStorageList = [];
    }
}


export interface DeviceComputerForm {
    computerCategory: FormControl<IComputerCategory>;
    description: FormControl<string>;
    virtual: FormControl<boolean>;
}