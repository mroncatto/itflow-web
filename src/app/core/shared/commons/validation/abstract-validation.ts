import { Validators } from "@angular/forms";
import { Patterns } from "../enum/pattern.enum";

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
        return [Validators.minLength(minLength), Validators.maxLength(maxLength)];
    }

    protected static onlyNumbers(): Validators {
        return Validators.pattern(Patterns.ONLY_NUMBERS);
    }
}