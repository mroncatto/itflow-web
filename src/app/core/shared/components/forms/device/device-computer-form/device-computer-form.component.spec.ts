import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceComputerFormComponent } from './device-computer-form.component';

describe('DeviceComputerFormComponent', () => {
  let component: DeviceComputerFormComponent;
  let fixture: ComponentFixture<DeviceComputerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceComputerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceComputerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
