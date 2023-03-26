import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class DepartmentValidation extends AbstractValidation {

    static nameDept(): Validators[] {
        return [Validators.max(45), Validators.required]
    }

    static branch(): Validators[] {
        return [Validators.required];
    }
}