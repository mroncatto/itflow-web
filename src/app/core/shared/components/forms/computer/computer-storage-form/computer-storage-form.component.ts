import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ComputerStorageForm, IComputerStorage } from 'src/app/core/components/computer/model/computer-storage';
import { ComputerService } from 'src/app/core/components/computer/services/computer.service';
import { AbstractComponent } from 'src/app/core/shared/abstracts/abstract-component';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';

@Component({
  selector: 'app-computer-storage-form',
  templateUrl: './computer-storage-form.component.html',
  styleUrls: ['./computer-storage-form.component.css']
})
export class ComputerStorageFormComponent extends AbstractComponent implements OnInit, OnDestroy, IAbstractModelForms<IComputerStorage> {

  computerStorage!: IComputerStorage;
  computerStorageForm!: FormGroup<ComputerStorageForm>;
  result!: Subject<IComputerStorage>;

  constructor(
    private service: ComputerService,
    private modal: BsModalRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.result = new Subject();
    this.computerStorageForm = this.service.getComputerStorageForm();
  }


  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  payload(computerStorage: IComputerStorage): void {
    if (computerStorage) {
      this.computerStorageForm = this.service.getComputerStorageForm(computerStorage);
      this.computerStorage = computerStorage;
    }
  }

  save(): void {
    if (this.computerStorageForm.valid) {
      this.loading = true;
      if (this.computerStorage && this.computerStorage?.id) {
        this.sub.push(
          this.service.createComputerStorage(this.computerStorageForm.value as IComputerStorage).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      } else {
        this.sub.push(
          this.service.createComputerStorage(this.computerStorageForm.value as IComputerStorage).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      }
    } else {
      this.computerStorageForm.markAllAsTouched();
      this.service.onWarning("badRequest", "fillFieldsRequired");
    }
  }

  onSave(computerStorage: IComputerStorage): void {
    this.result.next(computerStorage);
    if (this.computerStorage?.id) {
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

  closeModal(): void {
    this.modal.hide();
  }

}
