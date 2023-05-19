import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerMemoryFormComponent } from './computer-memory-form.component';

describe('ComputerMemoryFormComponent', () => {
  let component: ComputerMemoryFormComponent;
  let fixture: ComponentFixture<ComputerMemoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerMemoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputerMemoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
