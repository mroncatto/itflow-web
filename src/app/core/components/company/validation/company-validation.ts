import { Validators } from "@angular/forms";
import { AbstractValidation } from "src/app/core/shared/commons/validation/abstract-validation";

export class CompanyValidation extends AbstractValidation {

    static nameCompany(): Validators[] {
        return this.description(1,45)
    }

    static document(): Validators[] {
        return this.description(0,5)
    }
    

}