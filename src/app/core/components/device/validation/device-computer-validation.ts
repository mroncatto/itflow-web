import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class DeviceComputerValidation extends AbstractValidation {

    static override description(): Validators[] {
        return [Validators.maxLength(75)];
    }
}