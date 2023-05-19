import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerStorageFormComponent } from './computer-storage-form.component';

describe('ComputerStorageFormComponent', () => {
  let component: ComputerStorageFormComponent;
  let fixture: ComponentFixture<ComputerStorageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerStorageFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputerStorageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
