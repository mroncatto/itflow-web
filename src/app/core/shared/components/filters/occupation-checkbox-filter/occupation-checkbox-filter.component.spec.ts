import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationCheckboxFilterComponent } from './occupation-checkbox-filter.component';

describe('OccupationCheckboxFilterComponent', () => {
  let component: OccupationCheckboxFilterComponent;
  let fixture: ComponentFixture<OccupationCheckboxFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupationCheckboxFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccupationCheckboxFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
