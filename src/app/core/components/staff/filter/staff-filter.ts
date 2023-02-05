import { IDepartmentFilter } from "../../company/filter/department-filter";
import { IOccupationFilter } from "./occupation-filter";

export class StaffFilter {
    param: string = "";
    department: IDepartmentFilter[] = [];
    occupation: IOccupationFilter[] = [];
}