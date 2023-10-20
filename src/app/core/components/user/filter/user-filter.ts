import { IPageFilter } from "src/app/core/shared/abstracts/interface/page-filter";
import { IRole } from "../model/role"
import { AbstractPageFilter } from "src/app/core/shared/abstracts/abstract-page-filter";

export class UserFilter extends AbstractPageFilter implements IPageFilter {
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