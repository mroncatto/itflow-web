import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class DeviceComputerCpuValidation extends AbstractValidation {
    static computerCpu(): Validators[] {
        return [Validators.required]
    }
    
    static vcpu(): Validators[] {
        return [Validators.required, this.onlyNumbers()]
    }

    static unit(): Validators[] {
        return [Validators.required, this.onlyNumbers()]
    }
}