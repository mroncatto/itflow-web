import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class ComputerStorageValidation extends AbstractValidation {
   
    static brandName(): Validators[] {
        return [Validators.required, Validators.maxLength(45)];
    }

    static transferRate(): Validators[] {
        return [Validators.required, Validators.maxLength(25)];
    }

    static type(): Validators[] {
        return [Validators.required, Validators.maxLength(25)];
    }
}