import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ComputerSoftwareForm, IComputerSoftware } from 'src/app/core/components/computer/model/computer-software';
import { ComputerService } from 'src/app/core/components/computer/services/computer.service';
import { AbstractComponent } from 'src/app/core/shared/abstracts/abstract-component';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  selector: 'app-computer-software-form',
  templateUrl: './computer-software-form.component.html',
  styleUrls: ['./computer-software-form.component.css']
})
export class ComputerSoftwareFormComponent extends AbstractComponent implements OnInit, OnDestroy, IAbstractModelForms<IComputerSoftware> {
  
  computerSoftware!: IComputerSoftware;
  computerSoftwareForm!: FormGroup<ComputerSoftwareForm>;
  result!: Subject<IComputerSoftware>;
  messages = TranslateMessages;

  constructor(
    private service: ComputerService,
    private modal: BsModalRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.result = new Subject();
    this.computerSoftwareForm = this.service.getComputerSoftwareForm();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  payload(computerSoftware: IComputerSoftware): void {
    if (computerSoftware) {
      this.computerSoftwareForm = this.service.getComputerSoftwareForm(computerSoftware);
      this.computerSoftware = computerSoftware;
    }
  }

  save(): void {
    if (this.computerSoftwareForm.valid) {
      this.loading = true;
      if (this.computerSoftware && this.computerSoftware?.id) {
        this.sub.push(
          this.service.updateComputerSoftware(this.computerSoftwareForm.value as IComputerSoftware).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      } else {
        this.sub.push(
          this.service.createComputerSoftware(this.computerSoftwareForm.value as IComputerSoftware).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      }
    } else {
      this.computerSoftwareForm.markAllAsTouched();
      this.service.onWarning(this.messages.WARNING_BAD_REQUEST, this.messages.WARNING_COMPLETE_REQUIRED_FIELDS);
    }
  }

  onSave(software: IComputerSoftware): void {
    this.result.next(software);
    if (this.computerSoftware?.id) {
      this.service.onSuccess(this.messages.INFO_SUCCESS, this.messages.INFO_UPDATED);
    } else {
      this.service.onSuccess(this.messages.INFO_SUCCESS, this.messages.INFO_CREATED);
    }
    this.closeModal();
  }

  onError(err: HttpErrorResponse): void {
    this.loading = false;
    this.service.onHttpError(err);
  }

  closeModal(): void {
    this.modal.hide();
  }

}
