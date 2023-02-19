import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { EMPTY, Subscription, switchMap, take } from 'rxjs';
import { IOccupation } from '../../../model/occupation';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.css']
})
export class OccupationComponent implements OnInit, OnDestroy {

  private sub: Subscription[] = [];
  occupations: IOccupation[] = [];
  errorResponse!: HttpErrorResponse;
  loading: boolean = true;

  constructor(private service: StaffService) { }

  ngOnInit(): void {
    this.getOcuppation();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  getOcuppation(): void {
    this.sub.push(
      this.service.getOccupation().subscribe({
        next: (data) => {
          this.occupations = data;
        },
        error: (err) => {
          this.service.onHttpError(err);
          this.errorResponse = err;
        },
        complete: () => this.loading = false
      })
    );
  }

  confirmDelete(occupation: IOccupation): void {
    this.sub.push(
      this.service.showConfirm('warning', 'delete', occupation.name).subscribe({
        next: (confirm) => {
          if (confirm) this.onDelete(occupation)
        },
        error: (err) => this.service.onHttpError(err)
      })
    )
  }


  private onDelete(occupation: IOccupation): void {
    this.sub.push(
      this.service.deleteOccupation(occupation.id).subscribe({
        next: () => this.afterDelete(occupation),
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private afterDelete(occupation: IOccupation): void {
    this.occupations = this.occupations.filter(o => o.id != occupation.id);
    this.service.onInfo("successfully", "deleted");
  }

  onCreate(): void {
    this.sub.push(
      this.service.getOccupationModal().subscribe({
        next: (data) => this.onAfterCreate(data),
        error: (err) => this.service.onHttpError(err)
      })
    );
  }

  onAfterCreate(occupation: IOccupation): void {
    this.occupations.push(occupation);
  }

  onUpdate(occupation: IOccupation): void {
    this.sub.push(
      this.service.getOccupationModal(occupation).subscribe({
        next: (data) => this.onAfterUpdate(data),
        error: (err) => this.service.onHttpError(err)
      })
    )
  }

  private onAfterUpdate(occupation: IOccupation): void {
    this.occupations.forEach(o => {
      if (o.id === occupation.id) Object.assign(o, occupation);
    });
  }

}