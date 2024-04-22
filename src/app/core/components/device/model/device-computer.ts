import { FormControl } from "@angular/forms";
import { IComputerCategory } from "../../computer/model/computer-category";
import { IDeviceComputerCpu } from "./device-computer-cpu";
import { IDeviceComputerMemory } from "./device-computer-memory";
import { IDeviceComputerStorage } from "./device-computer-storage";
import { IComputerSoftwareView, IDeviceComputerSoftware } from "./device-computer-software";
import { IDevice } from "./device";

export interface IDeviceComputerSample {
    readonly id: number;
    hostname: string;
    computerCategory: IComputerCategory;
    description: string;
    virtual: boolean;
}

export interface IDeviceComputer {
    readonly id: number;
    device: IDevice;
    computerCategory: IComputerCategory;
    description: string;
    virtual: boolean;
    computerCpuList: IDeviceComputerCpu[];
    computerMemoryList: IDeviceComputerMemory[];
    computerStorageList: IDeviceComputerStorage[];
    computerSoftwareList: IComputerSoftwareView[];
}

export class DeviceComputer implements IDeviceComputer {
    readonly id: number;
    device: IDevice;
    computerCategory: IComputerCategory;
    description: string;
    virtual: boolean;
    computerCpuList: IDeviceComputerCpu[] = [];
    computerMemoryList: IDeviceComputerMemory[] = [];
    computerStorageList: IDeviceComputerStorage[] = [];
    computerSoftwareList: IComputerSoftwareView[] = [];

    constructor(id: number, device: IDevice, computerCategory: IComputerCategory, description: string, 
        virtual: boolean) {
        this.id = id;
        this.device = device;
        this.computerCategory = computerCategory;
        this.description = description;
        this.virtual = virtual;
        this.computerCpuList = [];
        this.computerMemoryList = [];
        this.computerStorageList = [];
        this.computerSoftwareList = [];
    }
}


export interface DeviceComputerForm {
    computerCategory: FormControl<IComputerCategory>;
    description: FormControl<string>;
    virtual: FormControl<boolean>;
}