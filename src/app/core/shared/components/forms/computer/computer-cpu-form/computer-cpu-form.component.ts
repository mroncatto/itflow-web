import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ComputerCpuForm, IComputerCpu } from 'src/app/core/components/computer/model/computer-cpu';
import { ComputerService } from 'src/app/core/components/computer/services/computer.service';
import { AbstractComponent } from 'src/app/core/shared/abstracts/abstract-component';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';

@Component({
  selector: 'app-computer-cpu-form',
  templateUrl: './computer-cpu-form.component.html',
  styleUrls: ['./computer-cpu-form.component.css']
})
export class ComputerCpuFormComponent extends AbstractComponent implements OnInit, OnDestroy, IAbstractModelForms<IComputerCpu>  {

  computerCpu!: IComputerCpu;
  computerCpuForm!: FormGroup<ComputerCpuForm>;
  result!: Subject<IComputerCpu>;

  constructor(
    private service: ComputerService,
    private modal: BsModalRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.result = new Subject();
    this.computerCpuForm = this.service.getComputerCpuForm();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  payload(computerCpu: IComputerCpu): void {
    if (computerCpu) {
      this.computerCpuForm = this.service.getComputerCpuForm(computerCpu);
      this.computerCpu = computerCpu;
    }
  }

  save(): void {
    if (this.computerCpuForm.valid) {
      this.loading = true;
      if (this.computerCpu && this.computerCpu?.id) {
        this.sub.push(
          this.service.updateComputerCPU(this.computerCpuForm.value as IComputerCpu).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      } else {
        this.sub.push(
          this.service.createComputerCPU(this.computerCpuForm.value as IComputerCpu).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      }
    } else {
      this.computerCpuForm.markAllAsTouched();
      this.service.onWarning("badRequest", "fillFieldsRequired");
    }
  }

  onSave(computerCpu: IComputerCpu): void {
    this.result.next(computerCpu);
    if (this.computerCpu?.id) {
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
