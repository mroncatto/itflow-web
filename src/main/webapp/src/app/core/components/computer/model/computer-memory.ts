import { FormControl } from "@angular/forms";

export interface IComputerMemory {
    readonly id: number;
    brandName: string;
    type: string;
    size: string;
    frequency: string;
    active: boolean;
}

export interface ComputerMemoryForm {
    brandName: FormControl<string>;
    type: FormControl<string>;
    frequency: FormControl<string>;
    active: FormControl<boolean>;
}