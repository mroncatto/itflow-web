import { EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Observable } from "rxjs";

export interface IAbstractAutocomplete<T> {

    control: FormControl;
    register: T;
    items: Observable<T[]>;
    loading: boolean;
    id: string;
    onSelect: EventEmitter<T | null>;

    onSelectItem(event: MatAutocompleteSelectedEvent): void;
    search(): void;
    displayWith(cpu: T): string;
}