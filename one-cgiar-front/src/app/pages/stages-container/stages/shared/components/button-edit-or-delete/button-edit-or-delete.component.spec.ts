import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonEditOrDeleteComponent } from './button-edit-or-delete.component';

describe('ButtonEditOrDeleteComponent', () => {
  let component: ButtonEditOrDeleteComponent;
  let fixture: ComponentFixture<ButtonEditOrDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonEditOrDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonEditOrDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
