import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadindWidgetComponent } from './loadind-widget.component';

describe('LoadindWidgetComponent', () => {
  let component: LoadindWidgetComponent;
  let fixture: ComponentFixture<LoadindWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadindWidgetComponent]
    });
    fixture = TestBed.createComponent(LoadindWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
