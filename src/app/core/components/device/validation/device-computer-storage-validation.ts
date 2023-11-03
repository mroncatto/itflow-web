import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class DeviceComputerStorageValidation extends AbstractValidation {
    static computerStorage(): Validators[] {
        return [Validators.required]
    }
    
    static size(): Validators[] {
        return [Validators.required, Validators.min(1) ,this.onlyNumbers()]
    }

}