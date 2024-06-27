import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { IBranch } from "src/app/core/components/company/model/branch";
import { CompanyService } from "src/app/core/components/company/services/company.service";
import { AbstractComponent } from "../../abstracts/abstract-component";

@Component({
    selector: 'btn-new-branch',
    template: `<button (click)="execute()" type="button" [disabled]="loading" title="{{'commons.register' | translate }}" class="btn btn-primary"><i
    [class]="'fas ' + icon"></i></button>`
})

export class NewBranchButtonComponent extends AbstractComponent implements OnInit, OnDestroy {

    constructor(private service: CompanyService) { super() }

    @Input()
    icon: string = 'fa-folder-plus';
    @Input()
    override loading: boolean = false;

    @Output()
    onCreate: EventEmitter<IBranch> = new EventEmitter();

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.sub.forEach(sub => sub.unsubscribe());
      }

    execute(): void {
    this.sub.push(
      this.service.getBranchModal().subscribe({
        next: (data) => this.onAfterCreate(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onAfterCreate(branch: IBranch): void {
    this.onCreate.emit(branch);
  }

}