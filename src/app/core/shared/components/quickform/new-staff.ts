

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { CompanyService } from "src/app/core/components/company/services/company.service";
import { IStaff } from "src/app/core/components/staff/model/staff";
import { StaffService } from "src/app/core/components/staff/services/staff.service";
import { AbstractComponent } from "../../abstracts/abstract-component";

@Component({
    selector: 'btn-new-staff',
    template: `<button (click)="execute()" type="button" [disabled]="loading || !submodal" title="{{'commons.register' | translate }}" class="btn btn-primary"><i
    [class]="'fas ' + icon"></i></button>`
})

export class NewStaffButtonComponent extends AbstractComponent implements OnInit, OnDestroy {

    constructor(private service: StaffService) { super() }

    @Input()
    icon: string = 'fa-folder-plus';
    @Input()
    submodal: boolean = false;
    @Input()
    override loading: boolean = false;
    

    @Output()
    onCreate: EventEmitter<IStaff> = new EventEmitter();

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.sub.forEach(sub => sub.unsubscribe());
      }

    execute(): void {
    this.sub.push(
      this.service.getStaffModal().subscribe({
        next: (data) => this.onAfterCreate(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onAfterCreate(staff: IStaff): void {
    this.onCreate.emit(staff);
  }

}