import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractComponent } from 'src/app/core/shared/abstracts/abstract-component';
import { IDeviceCategory } from '../../../model/device-category';
import { DeviceService } from '../../../services/device.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends AbstractComponent implements OnInit, OnDestroy {

  categories: IDeviceCategory[] = [];

  constructor(private service: DeviceService) {
    super();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  getCategories(): void {
    this.sub.push(
      this.service.getDeviceCategories().subscribe({
        next: (data) => this.categories = data,
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onCreate(): void {
    this.sub.push(
      this.service.getDeviceCategoryModal().subscribe({
        next: (data) => this.categories.push(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onUpdate(category: IDeviceCategory): void {
    this.sub.push(
      this.service.getDeviceCategoryModal(category).subscribe({
        next: (data) => {
          this.categories.forEach(c => {
            if(c.id === data.id) Object.assign(c, data);
          })
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  confirmDelete(category: IDeviceCategory): void {
    this.sub.push(
      this.service.showConfirm('warning', 'delete', category.name).subscribe({
        next: (confirm) => { if(confirm) this.onDelete(category) }
      })
    );
  }

  onDelete(category: IDeviceCategory): void {
    this.sub.push(
      this.service.deleteDeviceCategory(category.id).subscribe({
        next: (data) => {
          this.service.onInfo('successfully', 'deleted');
          this.categories = this.categories.filter(c => c.id !== data.id);
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

}
