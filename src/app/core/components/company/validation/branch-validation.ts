import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class BranchValidation extends AbstractValidation {
    
    static nameBranch(): Validators[] {
        return this.description(5, 45);
    }

    static company(): Validators[] {
        return this.description(5, 45);
    }
}