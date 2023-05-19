import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerCpuFormComponent } from './computer-cpu-form.component';

describe('ComputerCpuFormComponent', () => {
  let component: ComputerCpuFormComponent;
  let fixture: ComponentFixture<ComputerCpuFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerCpuFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputerCpuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
