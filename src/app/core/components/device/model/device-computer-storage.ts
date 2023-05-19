import { IComputerStorage } from "../../computer/model/computer-storage";
import { IDeviceComputer } from "./device-computer";

export interface IDeviceComputerStorage {
    readonly id: number;
    deviceComputer: IDeviceComputer;
    computerStorage: IComputerStorage;
    size: string;
}