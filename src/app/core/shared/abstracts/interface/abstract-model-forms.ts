import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";

export interface IAbstractModelForms<T> {

    result: Subject<T>;

    payload(entity: T): void;
    save(): void;
    onSave(entity: T): void;
    onError(err: HttpErrorResponse): void;
    ngOnDestroy(): void;
    closeModal(): void;
}