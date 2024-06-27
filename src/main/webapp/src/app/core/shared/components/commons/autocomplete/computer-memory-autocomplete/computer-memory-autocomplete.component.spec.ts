import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerMemoryAutocompleteComponent } from './computer-memory-autocomplete.component';

describe('ComputerMemoryAutocompleteComponent', () => {
  let component: ComputerMemoryAutocompleteComponent;
  let fixture: ComponentFixture<ComputerMemoryAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComputerMemoryAutocompleteComponent]
    });
    fixture = TestBed.createComponent(ComputerMemoryAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
