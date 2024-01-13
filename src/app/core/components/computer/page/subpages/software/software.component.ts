import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAbstractRegisterSubpages } from 'src/app/core/shared/abstracts/interface/abstract-register-subpages';
import { IComputerSoftware } from '../../../model/computer-software';
import { Subscription } from 'rxjs';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';
import { ComputerService } from '../../../services/computer.service';
import { ISoftwareLicense } from '../../../model/software-license';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit, OnDestroy, IAbstractRegisterSubpages<IComputerSoftware>  {


  private sub: Subscription[] = [];
  loading: boolean = true;
  softwares: IComputerSoftware[] = [];
  messages = TranslateMessages;

  constructor(private service: ComputerService) { }

  ngOnInit(): void {
    this.getSoftware();
  }

  private getSoftware(): void {
    this.sub.push(
      this.service.getComputerSoftware().subscribe({
        next: (data) => this.softwares = data,
        error: (err) => this.service.onHttpError(err),
        complete: () => this.loading = false
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  onCreate(): void {
    this.sub.push(
      this.service.getComputerSoftwareModal().subscribe({
        next: (data) => this.softwares.push(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onUpdate(software: IComputerSoftware): void {
    this.sub.push(
      this.service.getComputerSoftwareModal(software).subscribe({
        next: (data) => {
          this.softwares.forEach(b => {
            if (b.id === data.id) Object.assign(b, data);
          })
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  confirmDelete(software: IComputerSoftware): void {
    this.sub.push(
      this.service.showConfirm(this.messages.WARNING, this.messages.MODAL_DELETE_RECORD, software.name).subscribe({
        next: (confirm) => { if (confirm) this.onConfirmeLicenses(software) }
      })
    );
  }

  onConfirmeLicenses(software: IComputerSoftware): void {
    if (software.licenses && software.licenses.length > 0) {
      this.service.showConfirm(this.messages.ATTENTION, this.messages.MODAL_DELETE_SOFTWARE_LICENSES, software.licenses.length.toString()).subscribe({
        next: (confirm) => { if (confirm) this.onDelete(software) }
      });
    } else {
      this.onDelete(software);
    }
  }

  onDelete(software: IComputerSoftware): void {
    this.sub.push(
      this.service.deleteComputerSoftware(software.id).subscribe({
        next: (data) => {
          this.service.onInfo(this.messages.INFO_SUCCESS, this.messages.INFO_DELETED);
          this.softwares = this.softwares.filter(b => b.id !== data.id);
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  countActiveLicenses(licenses: ISoftwareLicense[]): number {
    return licenses
      ? licenses.filter(license => license.active).length
      : 0;
  }

  expiredLicense(licenses: ISoftwareLicense[]): boolean {
    return licenses ? licenses.filter(license => this.containsExpiredLicense(license)).length > 0 : false;
  }

  private containsExpiredLicense(license: ISoftwareLicense): boolean {
    return license.active && this.isExpired(license.expireAt)
  }

  private isExpired(date: Date): boolean {
    if (date) {
      const expireDate = new Date(date).toISOString();
      const currentDate = new Date().toISOString();
      return currentDate > expireDate;
    }
    return false;
  }

}
