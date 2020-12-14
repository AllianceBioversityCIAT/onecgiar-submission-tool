import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoordinatorModalComponent } from './add-coordinator-modal.component';

describe('AddCoordinatorModalComponent', () => {
  let component: AddCoordinatorModalComponent;
  let fixture: ComponentFixture<AddCoordinatorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoordinatorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoordinatorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
