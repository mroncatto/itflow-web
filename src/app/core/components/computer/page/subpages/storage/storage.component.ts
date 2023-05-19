import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAbstractRegisterSubpages } from 'src/app/core/shared/abstracts/interface/abstract-register-subpages';
import { IComputerStorage } from '../../../model/computer-storage';
import { Subscription } from 'rxjs';
import { ComputerService } from '../../../services/computer.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit, OnDestroy, IAbstractRegisterSubpages<IComputerStorage> {

  private sub: Subscription[] = [];
  loading: boolean = true;
  storages: IComputerStorage[] = [];

  constructor(private service: ComputerService) { }

  ngOnInit(): void {
    this.getStorages();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  getStorages(): void {
    this.sub.push(
      this.service.getComputerStorage().subscribe({
        next: (data) => this.storages = data,
        error: (err) => this.service.onHttpError(err),
        complete: () => this.loading = false
      })
    );
  }

  onCreate(): void {
    this.sub.push(
      this.service.getComputerStorageModal().subscribe({
        next: (data) => this.storages.push(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onUpdate(storage: IComputerStorage): void {
    this.sub.push(
      this.service.getComputerStorageModal(storage).subscribe({
        next: (data) => {
          this.storages.forEach(b => {
            if (b.id === data.id) Object.assign(b, data);
          })
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  confirmDelete(storage: IComputerStorage): void {
    this.sub.push(
      this.service.showConfirm('warning', 'delete', `${storage.brandName} - ${storage.type}`).subscribe({
        next: (confirm) => { if (confirm) this.onDelete(storage) }
      })
    );
  }

  onDelete(storage: IComputerStorage): void {
    this.sub.push(
      this.service.deleteComputerCategory(storage.id).subscribe({
        next: (data) => {
          this.service.onInfo('successfully', 'deleted');
          this.storages = this.storages.filter(b => b.id !== data.id);
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

}
