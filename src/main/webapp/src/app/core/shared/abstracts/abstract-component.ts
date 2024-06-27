import { Subscription } from "rxjs";
import { LoadingState } from "../commons/enum/loading-state.enum";

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

    isDone(state: LoadingState): boolean {
        return state === LoadingState.Done;
    }
    
    isLoading(state: LoadingState): boolean {
        return state === LoadingState.Loading;
    }

    isError(state: LoadingState): boolean {
        return state === LoadingState.Error;
    }
}