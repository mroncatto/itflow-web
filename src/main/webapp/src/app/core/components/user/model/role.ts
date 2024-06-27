export interface IRole {
    id: number;
    role: string;
}

export class Role implements IRole {
    id: number;
    role: string;

    constructor(id: number, role: string) {
        this.id = id;
        this.role = role;
    }
}