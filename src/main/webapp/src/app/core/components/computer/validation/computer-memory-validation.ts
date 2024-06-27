import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class ComputerMemoryValidation extends AbstractValidation {

    static brandName(): Validators[] {
        return [Validators.required, Validators.maxLength(45)];
    }

    static type(): Validators[] {
        return [Validators.maxLength(25), Validators.required];
    }

    static frequency(): Validators[] {
        return [Validators.maxLength(25), this.onlyNumbers()];
    }

    static size(): Validators[] {
        return [Validators.maxLength(25), Validators.required, this.onlyNumbers()];
    }

}