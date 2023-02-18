import { FormControl } from "@angular/forms";
import { IBranch } from "./branch";

export interface IDepartment {
    readonly id: number;
    name: string;
    branch: IBranch;
    active: boolean;
}

export class Department implements IDepartment {
    id: number;
    name: string;
    branch: IBranch;
    active: boolean;

    constructor(id: number, name: string, branch: IBranch, active: boolean){
        this.id = id;
        this.name = name;
        this.branch = branch;
        this.active = active;
    }
    
}

export interface DepartmentForm {
    name: FormControl<string>;
    branch: FormControl<IBranch>;
    active: FormControl<boolean>;
}