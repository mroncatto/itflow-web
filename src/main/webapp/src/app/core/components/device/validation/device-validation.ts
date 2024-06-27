import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class DeviceValidation extends AbstractValidation {

    static hostname(): Validators[] {
        return [Validators.required, Validators.maxLength(25)]
    }

    static override description(): Validators[] {
        return [Validators.maxLength(75)];
    }

    static serialNumber(): Validators[] {
        return [Validators.maxLength(45)];
    }

    static deviceCategory(): Validators[] {
        return [Validators.required];
    }

    static department(): Validators[] {
        return [Validators.required];
    }
}