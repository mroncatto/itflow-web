import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { IOccupation } from 'src/app/core/components/staff/model/occupation';
import { StaffService } from 'src/app/core/components/staff/services/staff.service';
import { AbstractOccupation } from '../../../../abstracts/abstract-occupation';
import { IAbstractModelForms } from '../../../../abstracts/interface/abstract-model-forms';

@Component({
  selector: 'app-occupation-form',
  templateUrl: './occupation-form.component.html',
  styleUrls: ['./occupation-form.component.css']
})
export class OccupationFormComponent extends AbstractOccupation implements OnInit, OnDestroy, IAbstractModelForms<IOccupation> {


  result!: Subject<IOccupation>;
  occupation!: IOccupation;
  occupationForm!: UntypedFormGroup;
  mainView: boolean = false;

  constructor(
    private modal: BsModalRef,
    private service: StaffService
  ) {
    super();
  }

  payload(occupation: IOccupation): void {
    if (occupation) {
      this.occupationForm = this.service.getOccupationForm(occupation);
      this.occupation = occupation;
    }
  }

  ngOnInit(): void {
    this.result = new Subject();
    this.occupationForm = this.service.getOccupationForm();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  save(): void {
    if (this.occupationForm.valid) {
      this.loading = true;
      if (this.occupation && this.occupation?.id) {
        this.sub.push(
          this.service.updateOccupation(this.occupationForm.value as IOccupation).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        );
      } else {
        this.sub.push(
          this.service.createOccupation(this.occupationForm.value as IOccupation).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      }
    } else {
      this.service.onWarning("badRequest", "fillFieldsRequired");
    }
  }

  onSave(occupation: IOccupation): void {
    this.result.next(occupation);
    if (this.occupation?.id) {
      this.service.onSuccess("updated", "updated");
    } else {
      this.service.onSuccess("created", "created");
    }
    this.closeModal();
  }

  onError(err: HttpErrorResponse): void {
    this.loading = false;
    this.service.onHttpError(err);
  }

  closeModal() {
    this.modal.hide();
  }

}
