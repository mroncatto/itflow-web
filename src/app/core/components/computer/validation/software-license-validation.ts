import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class SoftwareLicenseValidation extends AbstractValidation {

    static code(): Validators[] {
        return [Validators.maxLength(45)];
    }

    static desc(): Validators[] {
        return this.description(1, 75);
    }

    static expireAt(): Validators[] {
        return [this.dateGreaterThan()];
    }

    static software(): Validators[] {
        return [Validators.required];
    }


}