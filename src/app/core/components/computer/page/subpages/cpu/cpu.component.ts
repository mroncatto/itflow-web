import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IComputerCpu } from '../../../model/computer-cpu';
import { ComputerService } from '../../../services/computer.service';
import { IAbstractRegisterSubpages } from 'src/app/core/shared/abstracts/interface/abstract-register-subpages';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent implements OnInit, OnDestroy, IAbstractRegisterSubpages<IComputerCpu> {

  private sub: Subscription[] = [];
  cpus: IComputerCpu[] = [];
  loading: boolean = true;

  constructor(private service: ComputerService) { }

  ngOnInit(): void {
    this.getCpus();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  getCpus(): void {
    this.sub.push(
      this.service.getComputerCPU().subscribe({
        next: (data) => this.cpus = data,
        error: (err) => this.service.onHttpError(err),
        complete: () => this.loading = false
      })
    );
  }

  onCreate(): void {
    this.sub.push(
      this.service.getComputerCpuModal().subscribe({
        next: (data) => this.cpus.push(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onUpdate(cpu: IComputerCpu): void {
    this.sub.push(
      this.service.getComputerCpuModal(cpu).subscribe({
        next: (data) => {
          this.cpus.forEach(b => {
            if (b.id === data.id) Object.assign(b, data);
          })
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  confirmDelete(cpu: IComputerCpu): void {
    this.sub.push(
      this.service.showConfirm('warning', 'delete', cpu.brandName + ' -  ' + cpu.model).subscribe({
        next: (confirm) => { if (confirm) this.onDelete(cpu) }
      })
    );
  }

  onDelete(cpu: IComputerCpu): void {
    this.sub.push(
      this.service.deleteComputerCPU(cpu.id).subscribe({
        next: (data) => {
          this.service.onInfo('successfully', 'deleted');
          this.cpus = this.cpus.filter(b => b.id !== data.id);
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

}
