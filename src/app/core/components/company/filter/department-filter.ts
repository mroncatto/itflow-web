import { IBranch } from "../model/branch";

export interface IDepartmentFilter {
    id: number;
    name: string;
    branch: IBranch;
    checked: boolean;
}