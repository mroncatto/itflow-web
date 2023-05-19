import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ComputerMemoryForm, IComputerMemory } from 'src/app/core/components/computer/model/computer-memory';
import { ComputerService } from 'src/app/core/components/computer/services/computer.service';
import { AbstractComponent } from 'src/app/core/shared/abstracts/abstract-component';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';

@Component({
  selector: 'app-computer-memory-form',
  templateUrl: './computer-memory-form.component.html',
  styleUrls: ['./computer-memory-form.component.css']
})
export class ComputerMemoryFormComponent extends AbstractComponent implements OnInit, OnDestroy, IAbstractModelForms<IComputerMemory>  {

  computerMemory!: IComputerMemory;
  computerMemoryForm!: FormGroup<ComputerMemoryForm>;
  result!: Subject<IComputerMemory>;

  constructor(
    private service: ComputerService,
    private modal: BsModalRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.result = new Subject();
    this.computerMemoryForm = this.service.getComputerMemoryForm();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  payload(computerMemory: IComputerMemory): void {
    if (computerMemory) {
      this.computerMemoryForm = this.service.getComputerMemoryForm(computerMemory);
      this.computerMemory = computerMemory;
    }
  }

  save(): void {
    if (this.computerMemoryForm.valid) {
      this.loading = true;
      if (this.computerMemory && this.computerMemory?.id) {
        this.sub.push(
          this.service.updateComputerMemory(this.computerMemoryForm.value as IComputerMemory).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      } else {
        this.sub.push(
          this.service.createComputerMemory(this.computerMemoryForm.value as IComputerMemory).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      }
    } else {
      this.computerMemoryForm.markAllAsTouched();
      this.service.onWarning("badRequest", "fillFieldsRequired");
    }
  }

  onSave(memory: IComputerMemory): void {
    this.result.next(memory);
    if (this.computerMemory?.id) {
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
