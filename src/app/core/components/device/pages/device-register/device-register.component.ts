import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './device-register.component.html',
  styleUrls: ['./device-register.component.css']
})
export class DeviceRegisterComponent implements OnInit, OnDestroy {

  private sub: Subscription[] = [];
  readonly pages: string[] = ["category"];
  page: string = '';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub.push(
      this.activatedRoute.queryParams.subscribe(
        query => {
          if (query['page'] && this.pages.includes(query['page'])) {
            this.setPageView(query['page']);
          } else {
            this.setPageView(this.pages[0]);
          }
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  private setPageView(page: string): void {
    if (this.pages.includes(page)) {
      this.page = page;
    } else {
      this.page = this.pages[0];
    }
  }

}
