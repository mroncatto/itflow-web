import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class DepartmentValidation extends AbstractValidation {

    static nameDept(): Validators[] {
        return this.description(1,45)
    }

    static branch(): Validators[] {
        return [Validators.required];
    }
}