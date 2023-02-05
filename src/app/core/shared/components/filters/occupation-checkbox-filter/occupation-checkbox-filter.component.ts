import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-occupation-checkbox-filter',
  templateUrl: './occupation-checkbox-filter.component.html',
  styleUrls: ['./occupation-checkbox-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OccupationCheckboxFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
