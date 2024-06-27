import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerRegisterComponent } from './computer-register.component';

describe('ComputerRegisterComponent', () => {
  let component: ComputerRegisterComponent;
  let fixture: ComponentFixture<ComputerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
