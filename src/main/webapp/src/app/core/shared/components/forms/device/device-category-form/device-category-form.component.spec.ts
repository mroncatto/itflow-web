import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCategoryFormComponent } from './device-category-form.component';

describe('DeviceCategoryFormComponent', () => {
  let component: DeviceCategoryFormComponent;
  let fixture: ComponentFixture<DeviceCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceCategoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
