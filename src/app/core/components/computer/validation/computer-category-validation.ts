import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class ComputerCategoryValidation extends AbstractValidation {

    static nameCategory(): Validators[] {
        return [Validators.required, Validators.maxLength(45)]
    }
}