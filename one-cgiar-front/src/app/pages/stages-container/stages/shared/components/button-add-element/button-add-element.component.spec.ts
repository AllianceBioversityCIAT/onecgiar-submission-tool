import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddElementComponent } from './button-add-element.component';

describe('ButtonAddElementComponent', () => {
  let component: ButtonAddElementComponent;
  let fixture: ComponentFixture<ButtonAddElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonAddElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAddElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
