import { FormControl } from "@angular/forms";

export interface IComputerCpu {
    readonly id: number;
    brandName: string;
    model: string;
    generation: string;
    socket: string;
    core: string;
    thread: string;
    frequency: string;
    fsb: string;
    active: boolean;
}

export interface ComputerCpuForm {
    brandName: FormControl<string>;
    model: FormControl<string>;
    generation: FormControl<string>;
    socket: FormControl<string>;
    core: FormControl<string>;
    thread: FormControl<string>;
    frequency: FormControl<string>;
    fsb: FormControl<string>;
    active: FormControl<boolean>;
}