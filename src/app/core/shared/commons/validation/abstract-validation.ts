import { Validators } from "@angular/forms";
import { Patterns } from "../enum/pattern.enum";
import { dateGreaterThanToday, dateLessThanToday } from "./date-validations";

export abstract class AbstractValidation {

    static email(): Validators[] {
        return [Validators.email, Validators.required, Validators.minLength(5)]
    }

    static strongPassword(): Validators[] {
        return [Validators.pattern(Patterns.STRONG_PASSWORD)];
    }

    static required(): Validators[]{
        return [Validators.required];
    }

    protected static description(minLength: number, maxLength: number): Validators[] {
        if (minLength > 0) return [Validators.minLength(minLength), Validators.maxLength(maxLength), Validators.required];
        return [Validators.minLength(minLength), Validators.maxLength(maxLength)];
    }

    protected static onlyNumbers(): Validators {
        return Validators.pattern(Patterns.ONLY_NUMBERS);
    }

    protected static dateGreaterThan(): Validators {
        return dateGreaterThanToday();
    }

    protected static dateLessThan(): Validators {
        return dateLessThanToday();
    }
}