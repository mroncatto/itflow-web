import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerCategoryFormComponent } from './computer-category-form.component';

describe('ComputerCategoryFormComponent', () => {
  let component: ComputerCategoryFormComponent;
  let fixture: ComponentFixture<ComputerCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerCategoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputerCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
