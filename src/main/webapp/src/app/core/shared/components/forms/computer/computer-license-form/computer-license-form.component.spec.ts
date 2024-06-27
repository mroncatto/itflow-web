import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerLicenseFormComponent } from './computer-license-form.component';

describe('ComputerLicenseFormComponent', () => {
  let component: ComputerLicenseFormComponent;
  let fixture: ComponentFixture<ComputerLicenseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComputerLicenseFormComponent]
    });
    fixture = TestBed.createComponent(ComputerLicenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
