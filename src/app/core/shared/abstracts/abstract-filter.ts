import { AbstractComponent } from "./abstract-component"

export abstract class AbstractFilter extends AbstractComponent {

    filterInput: string = "";
    
    normalize(param: string): string {
        return param.normalize('NFD').replace(/\p{Mn}/gu, "").toLowerCase();
    }

}