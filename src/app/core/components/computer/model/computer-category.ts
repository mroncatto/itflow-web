import { FormControl } from "@angular/forms";

export interface IComputerCategory {
    readonly id: number;
    name: string;
    active:boolean;
}


export interface ComputerCategoryForm {
    name: FormControl<string>;
    active: FormControl<boolean>;
}