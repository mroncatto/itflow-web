import { Validators } from "@angular/forms";

export abstract class AbstractValidation {

    static email(): Validators[] {
        return [Validators.email, Validators.required, Validators.minLength(5)]
    }

    static strongPassword(): Validators[] {
        return [Validators.pattern("?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")];
    }

    static required(): Validators[]{
        return [Validators.required];
    }

    protected static description(minLength: number, maxLength: number): Validators[] {
        return [Validators.minLength(minLength), Validators.maxLength(maxLength)];
    }

    protected static onlyNumbers(): Validators {
        return Validators.pattern('^[0-9]*$');
    }
}