import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ValidationService } from '../../../services/validation/validation.service';

@Component({
  selector: 'app-validation-field',
  templateUrl: './validation-field.component.html',
  styleUrls: ['./validation-field.component.css']
})
export class ValidationFieldComponent {

  @Input() form!: UntypedFormGroup;
  @Input() field!: string;
  constructor(private validationService: ValidationService) {}

  invalidControl(): boolean | undefined {
    return this.validationService.invalidControl(this.form, this.field);
  }

  errorMessage(): string {
    return this.validationService.getFormErrorMessage(this.form.controls[this.field]);
  }

}
