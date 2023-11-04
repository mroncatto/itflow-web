import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class DeviceComputerCpuValidation extends AbstractValidation {
    static computerCpu(): Validators[] {
        return [Validators.required]
    }
    
    static core(): Validators[] {
        return [Validators.required, Validators.min(1), this.onlyNumbers()]
    }

}