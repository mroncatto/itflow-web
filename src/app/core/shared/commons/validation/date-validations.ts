import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function dateGreaterThanToday(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const currentDate = new Date();
        const inputDate = control.value ? new Date(control.value) : null;

        if (inputDate && inputDate <= currentDate) {
            return { dateGreaterThanToday: true };
        }

        return null;
    }
}

export function dateLessThanToday(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const currentDate = new Date();
        const inputDate = control.value ? new Date(control.value) : null;

        if (inputDate && inputDate >= currentDate) {
            return { dateLessThanToday: true };
        }

        return null;
    }
}
