import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInitiativeModalComponent } from './create-initiative-modal.component';

describe('CreateInitiativeModalComponent', () => {
  let component: CreateInitiativeModalComponent;
  let fixture: ComponentFixture<CreateInitiativeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInitiativeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInitiativeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
