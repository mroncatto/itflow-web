import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class ComputerSoftwareValidation extends AbstractValidation {

    static software_name(): Validators[] {
        return [Validators.required, Validators.maxLength(45)];
    }

    static developer(): Validators[] {
        return [Validators.maxLength(45), Validators.required];
    }


}