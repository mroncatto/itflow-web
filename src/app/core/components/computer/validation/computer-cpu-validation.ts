import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class ComputerCpuValidation extends AbstractValidation {

    static brandName(): Validators[] {
        return [Validators.required, Validators.maxLength(45)];
    }

    static model(): Validators[] {
        return [Validators.required, Validators.maxLength(45)];
    }

    static generation(): Validators[] {
        return [Validators.maxLength(25)];
    }

    static socket(): Validators[] {
        return [Validators.maxLength(25)];
    }

    static core(): Validators[] {
        return [Validators.maxLength(25)];
    }

    static frequency(): Validators[] {
        return [Validators.maxLength(25)];
    }

    static fsb(): Validators[] {
        return [Validators.maxLength(25)];
    }
}