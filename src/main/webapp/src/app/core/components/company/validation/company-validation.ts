import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class CompanyValidation extends AbstractValidation {

    static nameCompany(): Validators[] {
        return [Validators.max(45), Validators.required]
    }

    static document(): Validators[] {
        return [Validators.max(45)];
    }


}