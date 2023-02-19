import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class DeviceCategoryValidation extends AbstractValidation {
    static nameCategory(): Validators[] {
        return this.description(1, 45);
    }
}