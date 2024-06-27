import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationFormComponent } from './occupation-form.component';

describe('OccupationFormComponent', () => {
  let component: OccupationFormComponent;
  let fixture: ComponentFixture<OccupationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
