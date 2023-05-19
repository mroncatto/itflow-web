import { IComputerMemory } from "../../computer/model/computer-memory";
import { IDeviceComputer } from "./device-computer";

export interface IDeviceComputerMemory {
    readonly id: number;
    deviceComputer: IDeviceComputer;
    computerMemory: IComputerMemory;
    unit: number;
}