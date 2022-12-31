import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class StaffValidation extends AbstractValidation {
   
    static fullName(): Validators[]{
        return [Validators.required, Validators.minLength(5)]
    }

    static department(): Validators[]{
        return [Validators.required];
    }
    
    static occupation(): Validators[]{
        return [Validators.required];
    }
}