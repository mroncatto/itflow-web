import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBranch } from '../../../model/branch';
import { CompanyService } from '../../../services/company.service';
import { IAbstractRegisterSubpages } from 'src/app/core/shared/abstracts/interface/abstract-register-subpages';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit, OnDestroy, IAbstractRegisterSubpages<IBranch> {

  private sub: Subscription[] = [];
  branches: IBranch[] = [];
  loading: boolean = true;
  messages = TranslateMessages;

  constructor(private service: CompanyService) { }

  ngOnInit(): void {
    this.getBranches();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  getBranches(): void {
    this.sub.push(
      this.service.getBranches().subscribe({
        next: (data) => this.branches = data,
        error: (err) => this.service.onHttpError(err),
        complete: () => this.loading = false
      })
    );
  }

  onCreate(): void {
    this.sub.push(
      this.service.getBranchModal().subscribe({
        next: (data) => this.branches.push(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onUpdate(branch: IBranch): void {
    this.sub.push(
      this.service.getBranchModal(branch).subscribe({
        next: (data) => {
          this.branches.forEach(b => {
            if (b.id === data.id) Object.assign(b, data);
          })
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  confirmDelete(branch: IBranch): void {
    this.sub.push(
      this.service.showConfirm(this.messages.WARNING, this.messages.MODAL_DELETE_RECORD, branch.name).subscribe({
        next: (confirm) => { if (confirm) this.onDelete(branch) }
      })
    );
  }

  onDelete(branch: IBranch): void {
    this.sub.push(
      this.service.deleteBranch(branch).subscribe({
        next: (data) => {
          this.service.onInfo(this.messages.INFO_SUCCESS, this.messages.INFO_DELETED);
          this.branches = this.branches.filter(b => b.id !== data.id);
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

}
