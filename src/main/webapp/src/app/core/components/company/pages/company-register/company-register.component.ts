import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit, OnDestroy {

  private sub: Subscription[] = [];
  readonly pages: string[] = ["company", "branch", "department"];
  page: string = '';
  messages = TranslateMessages;

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
