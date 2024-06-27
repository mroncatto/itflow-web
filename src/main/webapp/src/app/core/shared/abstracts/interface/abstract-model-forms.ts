import { HttpErrorResponse } from "@angular/common/http";
import { Subject } from "rxjs";

export interface IAbstractModelForms<T> {

    result: Subject<T>;

    payload(entity: T): void;
    save(): void;
    onSave(entity: any): void;
    onError(err: HttpErrorResponse): void;
    closeModal(): void;
}