import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateConfigService } from '../translate/translate-config.service';
import { Patterns } from '../../commons/enum/pattern.enum';
import { TranslateMessages } from '../../commons/enum/translate-messages.enum';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  messages = TranslateMessages;
  constructor(private translateService: TranslateConfigService) { }

  invalidForm(form: AbstractControl, field: string): boolean | undefined {
    return (form.get(field)?.touched && form.get(field)?.invalid);
  }

  invalidControl(control: AbstractControl): boolean | undefined {
    return (control.touched && control.invalid);
  }

  getControlErrorMessage(form: AbstractControl): string {
    if (form.hasError('pattern')) return `${this.translateService.instant(this.messages.FORMS_PATTERN)}: ${this.getPattern(form.errors?.['pattern'].requiredPattern)}`;
    if (form.hasError('email')) return this.translateService.instant(this.messages.FORMS_EMAIL);
    if (form.hasError('required')) return this.translateService.instant(this.messages.FORMS_REQUIRED);
    if (form.hasError('minlength')) return this.translateService.instant(this.messages.FORMS_MIN_LENGTH, {n: form.errors?.['minlength'].requiredLength});
    if (form.hasError('maxlength')) return this.translateService.instant(this.messages.FORMS_MAX_LENGTH, {n: form.errors?.['maxlength'].requiredLength});
    if (form.hasError('min')) return this.translateService.instant(this.messages.FORMS_MIN, {n: form.errors?.['min'].min});
    if (form.hasError('max')) return this.translateService.instant(this.messages.FORMS_MAX, {n: form.errors?.['max'].max});
    if (form.hasError('dateGreaterThanToday')) return this.translateService.instant(this.messages.FORMS_DATE_GREATER_THAN_TODAY);
    if (form.hasError('dateLessThanToday')) return this.translateService.instant(this.messages.FORMS_DATE_LESS_THAN_TODAY);
    return this.translateService.instant(this.messages.FORMS_INVALID_FIELD);
  }

  getPattern(pattern: string): string {
    switch(pattern) {
      case Patterns.ONLY_LETTERS:
        return this.translateService.instant(this.messages.FORMS_FORMAT_ONLY_LETTERS);
      case Patterns.ONLY_POSITIVE_NUMBERS:
        return this.translateService.instant(this.messages.FORMS_FORMAT_ONLY_POSITIVE_NUMBERS);
        case Patterns.ONLY_NUMBERS:
          return this.translateService.instant(this.messages.FORMS_FORMAT_ONLY_NUMBERS);
      case Patterns.STRONG_PASSWORD:
        return this.translateService.instant(this.messages.FORMS_FORMAT_STRONG_PASSWORD);
    }

    return this.translateService.instant(this.messages.FORMS_FORMAT_INVALID);
  }
}
