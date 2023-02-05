import { EventEmitter } from "@angular/core";

export interface IAbstractCheckboxFilter<T> {

    itemList: any[];
    filteredItemList: any[];
    onSelect: EventEmitter<any>;

    ngOnDestroy(): void;
    loadData(): void;
    onSuccess(data: T[]): void;
    onChange(item: any): void;
    clearSelection(): void;
    clearFilter(): void;
    clearData(): void;
    countSelectedItems(): number;
    getFirstSelectedItemName(): string;
    selectionCounterExpresion(): string;
    filter(): void;
}