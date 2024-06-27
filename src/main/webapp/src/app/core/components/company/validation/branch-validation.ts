import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class BranchValidation extends AbstractValidation {
    
    static nameBranch(): Validators[] {
        return [Validators.maxLength(45), Validators.required];
    }

    static company(): Validators[] {
        return this.required();
    }
}