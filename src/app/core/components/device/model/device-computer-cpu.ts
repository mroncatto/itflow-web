import { IComputerCpu } from "../../computer/model/computer-cpu";
import { IDeviceComputer } from "./device-computer";
import { IDeviceComputerCpuPK } from "./pk/device-computer-cpu-pk";

export interface IDeviceComputerCpu {
    readonly id: IDeviceComputerCpuPK;
    deviceComputer: IDeviceComputer;
    computerCpu: IComputerCpu;
    vcpu: number;
    unit: number;
}