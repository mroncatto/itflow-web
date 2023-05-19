import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAbstractRegisterSubpages } from 'src/app/core/shared/abstracts/interface/abstract-register-subpages';
import { IComputerMemory } from '../../../model/computer-memory';
import { Subscription } from 'rxjs';
import { ComputerService } from '../../../services/computer.service';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit, OnDestroy, IAbstractRegisterSubpages<IComputerMemory>  {

  private sub: Subscription[] = [];
  loading: boolean = true;
  memories: IComputerMemory[] = [];

  constructor(private service: ComputerService) { }

  ngOnInit(): void {
    this.getMemories();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  private getMemories(): void {
    this.sub.push(
      this.service.getComputerMemory().subscribe({
        next: (data) => this.memories = data,
        error: (err) => this.service.onHttpError(err),
        complete: () => this.loading = false
      })
    );
  }

  onCreate(): void {
    this.sub.push(
      this.service.getComputerMemoryModal().subscribe({
        next: (data) => this.memories.push(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onUpdate(memory: IComputerMemory): void {
    this.sub.push(
      this.service.getComputerMemoryModal(memory).subscribe({
        next: (data) => {
          this.memories.forEach(b => {
            if (b.id === data.id) Object.assign(b, data);
          })
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  confirmDelete(memory: IComputerMemory): void {
    this.sub.push(
      this.service.showConfirm('warning', 'delete', `${memory.brandName} - ${memory.type}`).subscribe({
        next: (confirm) => { if (confirm) this.onDelete(memory) }
      })
    );
  }

  onDelete(memory: IComputerMemory): void {
    this.sub.push(
      this.service.deleteComputerMemory(memory.id).subscribe({
        next: (data) => {
          this.service.onInfo('successfully', 'deleted');
          this.memories = this.memories.filter(b => b.id !== data.id);
        },
        error: (err) => this.service.onHttpError(err)
      })
    );
  }



}
