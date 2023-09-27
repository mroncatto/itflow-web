import { Subscription } from "rxjs";

export abstract class AbstractComponent {
    public loading: boolean = false;
    protected sub: Subscription[] = [];

    compareWith(object1: any, object2: any): boolean {
        return object1?.id === object2?.id;
    }

    nextFocus(component: string, event?: KeyboardEvent): void {
        if (event) {
            if (event.key === 'Enter') document.getElementById(component)?.focus();
        } else {
            document.getElementById(component)?.focus();
        }    
    }
}