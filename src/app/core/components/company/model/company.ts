export interface ICompany {
    readonly id: number;
    name: string;
    document: string;
    active: boolean;
}

export class Company implements ICompany {
    id: number;
    name: string;
    document: string;
    active: boolean;

    constructor(id: number, name: string, document: string, active: boolean) {
        this.id = id;
        this.name = name;
        this.document = document;
        this.active = active;
    }
}