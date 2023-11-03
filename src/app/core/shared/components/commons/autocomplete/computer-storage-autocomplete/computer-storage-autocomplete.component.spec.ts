import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerStorageAutocompleteComponent } from './computer-storage-autocomplete.component';

describe('ComputerStorageAutocompleteComponent', () => {
  let component: ComputerStorageAutocompleteComponent;
  let fixture: ComponentFixture<ComputerStorageAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComputerStorageAutocompleteComponent]
    });
    fixture = TestBed.createComponent(ComputerStorageAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
