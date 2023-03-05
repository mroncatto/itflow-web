import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IDeviceCategory } from 'src/app/core/components/device/model/device-category';
import { DeviceService } from 'src/app/core/components/device/services/device.service';
import { AbstractComponent } from '../../../abstracts/abstract-component';
import { ICheckboxFilter } from '../../../abstracts/interface/checkbox-filter';
import { ICheckboxFilterImpl } from '../../../abstracts/interface/checkbox-filter-implement';
import { CheckboxFilterComponent } from '../checkbox-filter/checkbox-filter.component';

@Component({
  selector: 'app-device-category-checkbox-filter',
  templateUrl: './device-category-checkbox-filter.component.html',
  styleUrls: ['./device-category-checkbox-filter.component.css']
})
export class DeviceCategoryCheckboxFilterComponent extends AbstractComponent implements OnInit, OnDestroy, ICheckboxFilterImpl<IDeviceCategory> {

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @ViewChild(CheckboxFilterComponent) checkboxFilter!: CheckboxFilterComponent;

  itemList: ICheckboxFilter[] = [];
  records: IDeviceCategory[] = [];

  constructor(private service: DeviceService) {
    super();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  select(items: ICheckboxFilter[]): void {
    this.onSelect.emit(items);
  }
  
  load(): void {
    if (this.records.length > 0) return;
    this.loading = true;
    this.sub.push(
      this.service.getDeviceCategoriesUsingByDevice().subscribe({
        next: (data) => this.onSuccess(data)
      })
    )
  }

  onSuccess(data: IDeviceCategory[]): void {
    this.records = data;
    data.forEach(data => {
      this.itemList.push({ id: data.id, name: data.name, checked: false });
    });
  }

  refresh(): void {
    this.clearSelection();
    this.records = [];
    this.itemList = [];
    this.load();
  }

  clearSelection(): void {
    this.checkboxFilter.clearSelection();
  }

}
