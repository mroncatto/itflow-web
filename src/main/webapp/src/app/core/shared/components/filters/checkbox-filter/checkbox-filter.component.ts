import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICheckboxFilter } from '../../../abstracts/interface/checkbox-filter';
import { TranslateMessages } from '../../../commons/enum/translate-messages.enum';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.css']
})
export class CheckboxFilterComponent implements OnInit {

  messages = TranslateMessages;

  @Output() onSelect: EventEmitter<ICheckboxFilter[]> = new EventEmitter();
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() onRefresh: EventEmitter<any> = new EventEmitter();

  @Input()
  id: string = '';
  @Input()
  headerText: string = '';
  @Input()
  icon: string = 'fa-filter';
  @Input()
  loading: boolean = false;
  @Input()
  itemList: ICheckboxFilter[] = [];

  filterInput: string = "";
  filteredItemList: ICheckboxFilter[] = [];

  ngOnInit(): void {
  }

  load(): void {
    this.onClick.emit();
  }

  refresh(): void {
    this.onRefresh.emit();
  }

  onChange(item: ICheckboxFilter, filtering: boolean = false): void {
    if (filtering) {
      this.itemList.forEach(d => {
        if (d.id == item.id) d.checked = item.checked;
      })
    }
    this.onSelect.emit(this.itemList.filter(d => d.checked));
  }

  clearSelection(): void {
    if (this.countSelectedItems() > 0 || this.filterInput.length > 0) {
      this.itemList.forEach(f => f.checked = false);
      this.filterInput = "";
      this.filteredItemList = [];
      this.onSelect.emit([]);
    }
  }

  normalize(param: string): string {
    return param.normalize('NFD').replace(/\p{Mn}/gu, "").toLowerCase();
  }

  clearFilter(): void {
    this.filterInput = "";
    this.filteredItemList = [];
  }

  clearData(): void {
    this.itemList = [];
    this.filteredItemList = [];
  }

  countSelectedItems(): number {
    return this.itemList.filter(d => d.checked).length;
  }

  getFirstSelectedItemName(): string {
    if (this.itemList.length > 0)
      return this.itemList
        .filter(d => d.checked)[0]
        .name;

    return "";
  }

  selectionCounterExpresion(): string {
    if (this.countSelectedItems() > 1) return "+" + (this.countSelectedItems() - 1);
    return "";
  }

  filter(): void {
    if (this.filterInput.length > 0) {
      this.filteredItemList = this.itemList.filter(d => {
        return this.normalize(d.name).startsWith(this.normalize(this.filterInput))
          || this.normalize(d.name).includes(this.normalize(this.filterInput));
      });
    } else {
      this.filteredItemList = [];
    }
  }

}
