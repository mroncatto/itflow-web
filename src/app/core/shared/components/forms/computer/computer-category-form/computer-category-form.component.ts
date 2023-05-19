import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ComputerCategoryForm, IComputerCategory } from 'src/app/core/components/computer/model/computer-category';
import { ComputerService } from 'src/app/core/components/computer/services/computer.service';
import { AbstractComponent } from 'src/app/core/shared/abstracts/abstract-component';
import { IAbstractModelForms } from 'src/app/core/shared/abstracts/interface/abstract-model-forms';

@Component({
  selector: 'app-computer-category-form',
  templateUrl: './computer-category-form.component.html',
  styleUrls: ['./computer-category-form.component.css']
})
export class ComputerCategoryFormComponent extends AbstractComponent implements OnInit, OnDestroy, IAbstractModelForms<IComputerCategory>  {

  computerCategory!: IComputerCategory;
  computerCategoryForm!: FormGroup<ComputerCategoryForm>;
  result!: Subject<IComputerCategory>;

  constructor(
    private service: ComputerService,
    private modal: BsModalRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.result = new Subject();
    this.computerCategoryForm = this.service.getComputerCategoryForm();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  payload(computerCategory: IComputerCategory): void {
    if (computerCategory) {
      this.computerCategoryForm = this.service.getComputerCategoryForm(computerCategory);
      this.computerCategory = computerCategory;
    }
  }

  save(): void {
    if (this.computerCategoryForm.valid) {
      this.loading = true;
      if (this.computerCategory && this.computerCategory?.id) {
        this.sub.push(
          this.service.updateComputerCategory(this.computerCategoryForm.value as IComputerCategory).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      } else {
        this.sub.push(
          this.service.createComputerCategory(this.computerCategoryForm.value as IComputerCategory).subscribe({
            next: (data) => this.onSave(data),
            error: (err) => this.onError(err)
          })
        )
      }
    } else {
      this.computerCategoryForm.markAllAsTouched();
      this.service.onWarning("badRequest", "fillFieldsRequired");
    }
  }

  onSave(computerCategory: IComputerCategory): void {
    this.result.next(computerCategory);
    if (this.computerCategory?.id) {
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
