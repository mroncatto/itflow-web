import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseKeyAssignComponent } from './license-key-assign.component';

describe('LicenseKeyAssignComponent', () => {
  let component: LicenseKeyAssignComponent;
  let fixture: ComponentFixture<LicenseKeyAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicenseKeyAssignComponent]
    });
    fixture = TestBed.createComponent(LicenseKeyAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
