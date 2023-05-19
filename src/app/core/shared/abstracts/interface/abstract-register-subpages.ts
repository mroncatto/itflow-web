import { Subscription } from "rxjs";

export interface IAbstractRegisterSubpages<T> {

    loading: boolean;

    onCreate(): void;
    onUpdate(entity: T): void;
    confirmDelete(entity: T): void;
    onDelete(entity: T): void;
}