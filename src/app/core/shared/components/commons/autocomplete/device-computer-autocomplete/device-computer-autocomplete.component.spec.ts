import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceComputerAutocompleteComponent } from './device-computer-autocomplete.component';

describe('DeviceComputerAutocompleteComponent', () => {
  let component: DeviceComputerAutocompleteComponent;
  let fixture: ComponentFixture<DeviceComputerAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceComputerAutocompleteComponent]
    });
    fixture = TestBed.createComponent(DeviceComputerAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
