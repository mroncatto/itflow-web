import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.css']
})
export class InputGroupComponent {

  @Input() form!: FormGroup;
  @Input() id: string = "";
  @Input() translateLabel: string = "";
  @Input() translatePlaceholder: string = "";
  @Input() type: string = "text";

  isRequired(): boolean {
    const control = this.form.get(this.id);
    if(!control?.validator) return false;

    const validator = control.validator({} as AbstractControl);
    return (validator && validator['required']);
  }

  getControl(): any {
    return this.form.get(this.id);
  }

}
