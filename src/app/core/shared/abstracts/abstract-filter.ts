import { AbstractComponent } from "./abstract-component"

export abstract class AbstractFilter<T> extends AbstractComponent {

  protected records: T[] = [];
  filterInput: string = "";
  itemList: any[] = [];
  filteredItemList: any[] = [];

  normalize(param: string): string {
    return param.normalize('NFD').replace(/\p{Mn}/gu, "").toLowerCase();
  }

  clearFilter(): void {
    this.filterInput = "";
    this.filteredItemList = [];
  }

  clearData(): void {
    this.records = [];
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