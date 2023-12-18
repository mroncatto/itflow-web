import { FormControl } from "@angular/forms";
import { ISoftwareLicense } from "./software-license";

export interface IComputerSoftware {
    readonly id: number;
    name: string;
    developer: string;
    licenses: ISoftwareLicense[];
    active: boolean;
}

export interface ComputerSoftwareForm {
    name: FormControl<string>;
    developer: FormControl<string>;
    active: FormControl<boolean>;
}