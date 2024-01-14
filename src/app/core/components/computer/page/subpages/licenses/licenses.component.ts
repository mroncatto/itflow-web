import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAbstractRegisterSubpages } from 'src/app/core/shared/abstracts/interface/abstract-register-subpages';
import { ISoftwareLicense } from '../../../model/software-license';
import { Subscription } from 'rxjs';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';
import { ComputerService } from '../../../services/computer.service';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css']
})
export class LicensesComponent implements OnInit, OnDestroy, IAbstractRegisterSubpages<ISoftwareLicense> {

  private sub: Subscription[] = [];
  loading: boolean = true;
  licenses: ISoftwareLicense[] = [];
  messages = TranslateMessages;

  constructor(private service: ComputerService) { }

  ngOnInit(): void {
    this.getLicenses();
  }

  private getLicenses(): void {
    this.sub.push(
      this.service.getSoftwareLicense().subscribe({
        next: (data) => this.licenses = data,
        error: (err) => this.service.onHttpError(err),
        complete: () => this.loading = false
      })
    )
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  onCreate(): void {
    this.sub.push(
      this.service.getSoftwareLicenseModal().subscribe({
        next: (data) => this.licenses.push(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onUpdate(license: ISoftwareLicense): void {
    this.sub.push(
      this.service.getSoftwareLicenseModal(license).subscribe({
        next: (data) => {
          this.licenses.forEach(b => {
            if (b.id === data.id) Object.assign(b, data);
          })
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  confirmDelete(license: ISoftwareLicense): void {
    this.sub.push(
      this.service.showConfirm(this.messages.WARNING, this.messages.MODAL_DELETE_RECORD, license.description).subscribe({
        next: (confirm) => { if (confirm) this.onConfirmeKeys(license) }
      })
    );
  }

  onConfirmeKeys(license: ISoftwareLicense): void {
    if (license.keys && license.keys.length > 0) {
      this.service.showConfirm(this.messages.ATTENTION, this.messages.MODAL_DELETE_LICENSE_KEYS).subscribe({
        next: (confirm) => { if (confirm) this.onDelete(license) }
      });
    } else {
      this.onDelete(license);
    }
  }

  onDelete(license: ISoftwareLicense): void {
    this.sub.push(
      this.service.deleteSoftwareLicense(license.id).subscribe({
        next: (data) => {
          this.service.onInfo(this.messages.INFO_SUCCESS, this.messages.INFO_DELETED);
          this.licenses = this.licenses.filter(b => b.id !== data.id);
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onManageKeys(license: ISoftwareLicense): void {
    this.sub.push(
      this.service.getLicenseKeyModal(license).subscribe({
        next: (data) => this.onUpdateLicenseKeys(data),
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  onUpdateLicenseKeys(license: ISoftwareLicense): void {
    this.licenses.forEach(b => {
      if (b.id === license.id) b.keys = license.keys;
    });
  }

  getCountKeys(softwareLicense: ISoftwareLicense): number {
    if (softwareLicense.keys) return softwareLicense.keys?.length;
    return 0;
  }

}
