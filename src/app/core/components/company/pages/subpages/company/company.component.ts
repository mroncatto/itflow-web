import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { EMPTY, Subscription, switchMap, take } from 'rxjs';
import { Company, ICompany } from '../../../model/company';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, OnDestroy {

  private sub: Subscription[] = [];
  companies: ICompany[] = [];
  errorResponse!: HttpErrorResponse;
  loading: boolean = true;

  constructor(private service: CompanyService) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  private getCompanies(): void {
    this.sub.push(
      this.service.getCompanies().subscribe({
        next: (data) => {
          this.companies = data;
        },
        error: (err) => {
          this.service.onHttpError(err);
          this.errorResponse = err;
        },
        complete: () => this.loading = false
      })
    );
  }

  onCreate(): void {
    this.sub.push(
      this.service.getCompanyModal(true).subscribe({
        next: (data) => this.companies.push(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onUpdate(company: ICompany): void {
    this.sub.push(
      this.service.getCompanyModal(true, company).subscribe({
        next: (data) => this.companies.forEach(c => {
          if (c.id === company.id) Object.assign(c, data);
        }),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  confirmDelete(company: ICompany): void {
    this.sub.push(
      this.service.showConfirm('warning', 'delete', company.name).subscribe({
        next: (confirm) => { if (confirm) this.onDelete(company) }
      })
    )
  }

  private onDelete(company: ICompany): void {
    this.sub.push(
      this.service.deleteCompany(company.id).subscribe({
        next: () => {
          this.companies = this.companies.filter(c => c.id !== company.id);
          this.service.onInfo("successfully", "deleted");
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

}
