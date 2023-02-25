import { IPageFilter } from "src/app/core/shared/abstracts/interface/page-filter";
import { IRole } from "../model/role"

export class UserFilter implements IPageFilter {
    input: string = "";
    
    isFilterNotEmpty(): boolean {
        return this.input.length > 0;
    }

    cleanFilter(): void {
        this.input = "";
    }


    hasInput(): boolean {
        return this.input.length > 0;
    }
}