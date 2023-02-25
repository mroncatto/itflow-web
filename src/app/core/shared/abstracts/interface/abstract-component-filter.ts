export interface IAbstractComponentFilter {
    filter: any;
    cleanFilter(): void;
    refresh(): void;
}