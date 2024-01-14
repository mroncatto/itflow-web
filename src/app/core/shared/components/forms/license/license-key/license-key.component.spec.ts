import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseKeyComponent } from './license-key.component';

describe('LicenseKeyComponent', () => {
  let component: LicenseKeyComponent;
  let fixture: ComponentFixture<LicenseKeyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicenseKeyComponent]
    });
    fixture = TestBed.createComponent(LicenseKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
