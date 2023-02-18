import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class DeviceValidation extends AbstractValidation {

    static hostname(): Validators[] {
        return [Validators.required, Validators.maxLength(25)]
    }

    static override description(): Validators[] {
        return [Validators.minLength(5), Validators.maxLength(75), Validators.required];
    }

    static serialNumber(): Validators[] {
        return [Validators.maxLength(45)];
    }
}