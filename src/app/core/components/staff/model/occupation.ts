export interface IOccupation {
    readonly id: number;
    name: string;
    active: boolean;
}

export class Occupation implements IOccupation {
    id: number;
    name: string;
    active: boolean;

    constructor(id: number, name: string, active: boolean) {
        this.id = id;
        this.name = name;
        this.active = active;
    }
}