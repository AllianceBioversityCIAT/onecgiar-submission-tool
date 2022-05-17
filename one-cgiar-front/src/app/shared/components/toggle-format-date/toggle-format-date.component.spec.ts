import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleFormatDateComponent } from './toggle-format-date.component';

describe('ToggleFormatDateComponent', () => {
  let component: ToggleFormatDateComponent;
  let fixture: ComponentFixture<ToggleFormatDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleFormatDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleFormatDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
