import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class ComputerMemoryValidation extends AbstractValidation {

    static brandName(): Validators[] {
        return [Validators.required, Validators.maxLength(45)];
    }

    static type(): Validators[] {
        return [Validators.maxLength(25)];
    }

    static frequency(): Validators[] {
        return [Validators.maxLength(25)];
    }

    static size(): Validators[] {
        return [Validators.maxLength(25)];
    }

}