import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class DeviceComputerMemoryValidation extends AbstractValidation {
    static computerMemory(): Validators[] {
        return [Validators.required]
    }
    
    static modules(): Validators[] {
        return [Validators.required, Validators.min(1) ,this.onlyNumbers()]
    }

}