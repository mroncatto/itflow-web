import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class OccupationValidation extends AbstractValidation {

    static nameOccupation(): Validators[] {
        return [this.description(1,45), Validators.required];
    }
}