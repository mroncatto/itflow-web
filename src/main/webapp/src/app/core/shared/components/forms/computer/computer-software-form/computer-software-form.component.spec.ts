import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerSoftwareFormComponent } from './computer-software-form.component';

describe('ComputerSoftwareFormComponent', () => {
  let component: ComputerSoftwareFormComponent;
  let fixture: ComponentFixture<ComputerSoftwareFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComputerSoftwareFormComponent]
    });
    fixture = TestBed.createComponent(ComputerSoftwareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
