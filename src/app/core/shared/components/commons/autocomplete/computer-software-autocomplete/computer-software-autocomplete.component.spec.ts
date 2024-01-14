import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerSoftwareAutocompleteComponent } from './computer-software-autocomplete.component';

describe('ComputerSoftwareAutocompleteComponent', () => {
  let component: ComputerSoftwareAutocompleteComponent;
  let fixture: ComponentFixture<ComputerSoftwareAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComputerSoftwareAutocompleteComponent]
    });
    fixture = TestBed.createComponent(ComputerSoftwareAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
