

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { IDepartment } from "src/app/core/components/company/model/department";
import { CompanyService } from "src/app/core/components/company/services/company.service";
import { AbstractComponent } from "../../abstracts/abstract-component";

@Component({
    selector: 'btn-new-department',
    template: `<button (click)="execute()" type="button" [disabled]="loading" title="{{'commons.register' | translate }}" class="btn btn-primary"><i
    [class]="'fas ' + icon"></i></button>`
})

export class NewDepartmentButtonComponent extends AbstractComponent implements OnInit, OnDestroy {

    constructor(private service: CompanyService) { super() }

    @Input()
    icon: string = 'fa-folder-plus';
    @Input()
    override loading: boolean = false;

    @Output()
    onCreate: EventEmitter<IDepartment> = new EventEmitter();

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.sub.forEach(sub => sub.unsubscribe());
      }

    execute(): void {
    this.sub.push(
      this.service.getDptoModal().subscribe({
        next: (data) => this.onAfterCreate(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onAfterCreate(dpto: IDepartment): void {
    this.onCreate.emit(dpto);
  }

}