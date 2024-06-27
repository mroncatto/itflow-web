import { FormControl } from "@angular/forms";
import { IComputerCategory } from "../../computer/model/computer-category";
import { IDeviceComputerCpu } from "./device-computer-cpu";
import { IDeviceComputerMemory } from "./device-computer-memory";
import { IDeviceComputerStorage } from "./device-computer-storage";
import { IComputerSoftwareView, IDeviceComputerSoftware } from "./device-computer-software";
import { IDevice, IDeviceView } from "./device";

export interface IDeviceComputerDto {
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

    constructor(device: IDeviceView) {
        this.id = device.id;
        this.device = device;
        this.computerCategory = device.deviceComputer.computerCategory;
        this.description = device.deviceComputer.description;
        this.virtual = device.deviceComputer.virtual;
        this.computerCpuList = [];
        this.computerMemoryList = [];
        this.computerStorageList = [];
        this.computerSoftwareList = [];
    }

    convertDto(): IDeviceComputerDto {
        console.log(this)
        return {
            id: this.id,
            hostname: this.device.hostname,
            computerCategory: this.computerCategory,
            description: this.description,
            virtual: this.virtual
        }
    }
}


export interface DeviceComputerForm {
    computerCategory: FormControl<IComputerCategory>;
    description: FormControl<string>;
    virtual: FormControl<boolean>;
}