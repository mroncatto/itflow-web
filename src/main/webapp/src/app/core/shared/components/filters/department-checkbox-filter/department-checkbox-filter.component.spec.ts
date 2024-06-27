import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentCheckboxFilterComponent } from './department-checkbox-filter.component';

describe('DepartmentCheckboxFilterComponent', () => {
  let component: DepartmentCheckboxFilterComponent;
  let fixture: ComponentFixture<DepartmentCheckboxFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentCheckboxFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentCheckboxFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
