import { Validators } from "@angular/forms";
import { Patterns } from "src/app/core/shared/commons/enum/pattern.enum";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class UserValidation extends AbstractValidation {
   
    static fullName(): Validators[]{
        return [Validators.required, Validators.minLength(5)]
    }

    static password(): Validators[]{
        return [Validators.required, Validators.minLength(6)];
    }

    static username(): Validators[]{
        return [Validators.required, Validators.minLength(6), Validators.pattern(Patterns.ONLY_LETTERS)];
    }
}