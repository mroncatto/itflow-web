import { FormControl } from "@angular/forms";

export interface IComputerStorage {
    readonly id: number;
    brandName: string;
    transferRate: string;
    type: string;
    active: boolean;
}

export interface ComputerStorageForm {
    brandName: FormControl<string>;
    transferRate: FormControl<string>;
    type: FormControl<string>;
    active: FormControl<boolean>;
}