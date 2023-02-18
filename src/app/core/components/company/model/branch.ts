import { FormControl } from "@angular/forms";
import { Company, ICompany } from "./company";

export interface IBranch {
    readonly id: number;
    name: string;
    company: ICompany
    active: boolean;
}

export class Branch implements IBranch {
    id: number;
    name: string;
    company: ICompany;
    active: boolean;

    constructor(id: number, name: string, company: ICompany, active: boolean){
        this.id = id;
        this.name = name;
        this.company = company;
        this.active = active;
    }

}

export interface BranchForm {
    name: FormControl<string>;
    company: FormControl<Company>;
    active: FormControl<boolean>;
}