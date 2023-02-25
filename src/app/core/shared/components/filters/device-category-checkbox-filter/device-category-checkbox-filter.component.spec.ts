import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCategoryCheckboxFilterComponent } from './device-category-checkbox-filter.component';

describe('DeviceCategoryCheckboxFilterComponent', () => {
  let component: DeviceCategoryCheckboxFilterComponent;
  let fixture: ComponentFixture<DeviceCategoryCheckboxFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceCategoryCheckboxFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceCategoryCheckboxFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
