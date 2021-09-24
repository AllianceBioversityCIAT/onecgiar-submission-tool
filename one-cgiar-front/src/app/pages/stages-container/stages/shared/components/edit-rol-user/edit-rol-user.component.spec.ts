import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRolUserComponent } from './edit-rol-user.component';

describe('EditRolUserComponent', () => {
  let component: EditRolUserComponent;
  let fixture: ComponentFixture<EditRolUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRolUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRolUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
