import { Subscription } from "rxjs";

export abstract class AbstractComponent {
    public loading: boolean = false;
    protected sub: Subscription[] = [];

    compareWith(object1: any, object2: any): boolean {
        return object1?.id === object2?.id;
    }
}