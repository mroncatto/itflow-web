import { query } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginator: any;
  @Input() route: string = "";
  paginas: number[] = [];
  from!: number;
  to!: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let paginatorActualizado = changes['paginator'];
    if (paginatorActualizado.previousValue) {
      this.initPaginator();
    }
  }

  goPage(page: number): void {
    this.router.navigate([this.route], { queryParams: { page: page - 1 } });
  }

  firstPage(): void {
    this.router.navigate([this.route], { queryParams: { page: 0 } });
  }

  lastPage(): void {
    this.router.navigate([this.route], { queryParams: { page: this.paginator.totalPages - 1 } });
  }

  nextPage(): void {
    this.router.navigate([this.route], { queryParams: { page: this.paginator.number + 1 } });
  }

  backPage(): void {
    this.router.navigate([this.route], { queryParams: { page: this.paginator.number - 1 } });
  }

  // Keep pagination between 5 and 10 buttons
  private initPaginator(): void {
    this.from = Math.min(Math.max(1, this.paginator.number - 4), this.paginator.totalPages - 5);
    this.to = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 4), 6);

    if (this.paginator.totalPages > 5) {
      this.paginas = new Array(this.to - this.from + 1)
        .fill(0)
        .map((_value, i) => i + this.from);

    } else {
      this.paginas = new Array(this.paginator.totalPages)
        .fill(0)
        .map((_value, i) => i + 1);
    }
  }

}
