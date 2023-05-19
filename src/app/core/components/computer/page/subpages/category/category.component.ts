import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IComputerCategory } from '../../../model/computer-category';
import { ComputerService } from '../../../services/computer.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  private sub: Subscription[] = [];
  categories: IComputerCategory[] = [];
  loading: boolean = true;

  constructor(private service: ComputerService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  private getCategories(): void {
    this.sub.push(
      this.service.getCategories().subscribe({
        next: (data) => this.categories = data,
        error: (err) => this.service.onHttpError(err),
        complete: () => this.loading = false
      })
    )
  }

  onCreate(): void {
    this.sub.push(
      this.service.getComputerCategoryModal().subscribe({
        next: (data) => this.categories.push(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onUpdate(category: IComputerCategory): void {
    this.sub.push(
      this.service.getComputerCategoryModal(category).subscribe({
        next: (data) => {
          this.categories.forEach(b => {
            if (b.id === data.id) Object.assign(b, data);
          })
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  confirmDelete(category: IComputerCategory): void {
    this.sub.push(
      this.service.showConfirm('warning', 'delete', category.name).subscribe({
        next: (confirm) => { if (confirm) this.onDelete(category) }
      })
    );
  }

  onDelete(category: IComputerCategory): void {
    this.sub.push(
      this.service.deleteComputerCategory(category.id).subscribe({
        next: (data) => {
          this.service.onInfo('successfully', 'deleted');
          this.categories = this.categories.filter(b => b.id !== data.id);
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

}
