import { EventEmitter } from "@angular/core";
import { CheckboxFilterComponent } from "../../components/filters/checkbox-filter/checkbox-filter.component";
import { ICheckboxFilter } from "./checkbox-filter";

export interface ICheckboxFilterImpl<T> {
    itemList: ICheckboxFilter[];
    onSelect: EventEmitter<any>;
    records: T[];
    checkboxFilter: CheckboxFilterComponent;

    select(items: ICheckboxFilter[]): void;
    load(): void;
    onSuccess(data: T[]): void 
    refresh(): void;
    clearSelection(): void;
}