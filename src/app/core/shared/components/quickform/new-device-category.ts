import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { IDeviceCategory } from "src/app/core/components/device/model/device-category";
import { DeviceService } from "src/app/core/components/device/services/device.service";
import { AbstractComponent } from "../../abstracts/abstract-component";

@Component({
    selector: 'btn-new-device-category',
    template: `<button (click)="execute()" type="button" [disabled]="loading" title="{{'commons.register' | translate }}" class="btn btn-primary"><i
    [class]="'fas ' + icon"></i></button>`
})

export class NewDeviceCategoryButtonComponent extends AbstractComponent implements OnInit, OnDestroy {

    constructor(private service: DeviceService) { super() }

    @Input()
    icon: string = 'fa-folder-plus';
    @Input()
    override loading: boolean = false;

    @Output()
    onCreate: EventEmitter<IDeviceCategory> = new EventEmitter();

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.sub.forEach(sub => sub.unsubscribe());
      }

    execute(): void {
    this.sub.push(
      this.service.getDeviceCategoryModal().subscribe({
        next: (data) => this.onAfterCreate(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onAfterCreate(category: IDeviceCategory): void {
    this.onCreate.emit(category);
  }

}