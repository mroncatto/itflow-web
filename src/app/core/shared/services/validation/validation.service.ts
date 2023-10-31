import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateConfigService } from '../translate/translate-config.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private translateService: TranslateConfigService) { }

  invalidForm(form: AbstractControl, field: string): boolean | undefined {
    return (form.get(field)?.touched && form.get(field)?.invalid);
  }

  invalidControl(control: AbstractControl): boolean | undefined {
    return (control.touched && control.invalid);
  }

  getControlErrorMessage(form: AbstractControl): string {
    if (form.hasError('pattern')) return this.translateService.instant('forms.pattern', {n: form.errors?.['pattern'].requiredPattern});
    if (form.hasError('email')) return this.translateService.instant('forms.email');
    if (form.hasError('required')) return this.translateService.instant('forms.required');
    if (form.hasError('minlength')) return this.translateService.instant('forms.minlength', {n: form.errors?.['minlength'].requiredLength});
    if (form.hasError('maxlength')) return this.translateService.instant('forms.maxlength', {n: form.errors?.['maxlength'].requiredLength});
    if (form.hasError('min')) return this.translateService.instant('forms.min', {n: form.errors?.['min'].min});
    if (form.hasError('max')) return this.translateService.instant('forms.max', {n: form.errors?.['max'].max});
    return this.translateService.instant('forms.invalidField');
  }
}
