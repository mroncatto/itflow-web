import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractComponent } from '../../abstracts/abstract-component';
import { ComputerService } from 'src/app/core/components/computer/services/computer.service';
import { IComputerCategory } from 'src/app/core/components/computer/model/computer-category';

@Component({
  selector: 'btn-new-computer-category',
  template: `<button (click)="execute()" type="button" [disabled]="loading" title="{{'commons.register' | translate }}" class="btn btn-primary"><i
  [class]="'fas ' + icon"></i></button>`
})

export class NewComputerCategory extends AbstractComponent implements OnInit, OnDestroy {

  constructor(private service: ComputerService) {
    super()
  }

  @Input()
  icon: string = 'fa-folder-plus';
  @Input()
  override loading: boolean = false;

  @Output()
  onCreate: EventEmitter<IComputerCategory> = new EventEmitter();

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  execute(): void {
    this.sub.push(
      this.service.getComputerCategoryModal().subscribe({
        next: (data) => this.onAfterCreate(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onAfterCreate(category: IComputerCategory): void {
    this.onCreate.emit(category);
  }

}
