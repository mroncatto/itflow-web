import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { ValidationService } from '../../../services/validation/validation.service';

@Component({
  selector: 'app-validation-field',
  templateUrl: './validation-field.component.html',
  styleUrls: ['./validation-field.component.css']
})
export class ValidationFieldComponent {

  @Input() form!: FormGroup<any>;
  @Input() control!: FormControl<any>;
  @Input() field!: string;
  constructor(private validationService: ValidationService) { }

  invalidForm(): boolean | undefined {
    return this.isFormGroup() && this.validationService.invalidForm(this.form, this.field);
  }

  invalidControl(): boolean | undefined {
    return this.isFormControl() && this.validationService.invalidControl(this.control);
  }

  errorMessageForm(): string {
    return this.validationService.getControlErrorMessage(this.form.controls[this.field]);
  }

  errorMessageControl(): string {
    return this.validationService.getControlErrorMessage(this.control);
  }

  private isFormGroup(): boolean {
    return (this.form != null) && (this.field != null) && !this.isFormControl();
  }

  private isFormControl(): boolean {
    return (this.control != null) && !this.isFormGroup();
  }

}
