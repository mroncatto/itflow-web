import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerCpuAutocompleteComponent } from './computer-cpu-autocomplete.component';

describe('ComputerCpuAutocompleteComponent', () => {
  let component: ComputerCpuAutocompleteComponent;
  let fixture: ComponentFixture<ComputerCpuAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerCpuAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputerCpuAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
