import { AbstractPageFilter } from "src/app/core/shared/abstracts/abstract-page-filter";
import { ICheckboxFilter } from "src/app/core/shared/abstracts/interface/checkbox-filter";
import { IPageFilter } from "src/app/core/shared/abstracts/interface/page-filter";

export class DeviceFilter extends AbstractPageFilter implements IPageFilter {
    input: string = "";
    department: ICheckboxFilter[] = [];
    deviceCategory: ICheckboxFilter[] = [];


    isFilterNotEmpty(): boolean {
        return this.input.length > 0
            || this.department.length > 0
            || this.deviceCategory.length > 0
    }

    cleanFilter(): void {
        this.input = "";
        this.department = [];
        this.deviceCategory = [];
    }
}