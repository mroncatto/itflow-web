import { FormControl } from "@angular/forms";
import { IComputerSoftware } from "./computer-software";
import { ISoftwareLicenseKey } from "./software-license-keys";

export interface ISoftwareLicense {
    readonly id: number;
    description: string;
    code: string;
    expireAt: Date;
    software: IComputerSoftware;
    active: boolean;
    keys: ISoftwareLicenseKey[];
}


export interface SoftwareLicenseForm {
    description: FormControl<string>;
    code: FormControl<string>;
    expireAt: FormControl<Date>;
    software: FormControl<IComputerSoftware>;
    active: FormControl<boolean>;
}