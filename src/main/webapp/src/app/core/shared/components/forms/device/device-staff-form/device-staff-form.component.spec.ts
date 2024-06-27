import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceStaffFormComponent } from './device-staff-form.component';

describe('DeviceStaffFormComponent', () => {
  let component: DeviceStaffFormComponent;
  let fixture: ComponentFixture<DeviceStaffFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceStaffFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceStaffFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
