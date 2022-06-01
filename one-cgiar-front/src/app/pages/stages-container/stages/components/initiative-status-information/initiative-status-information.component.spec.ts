import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeStatusInformationComponent } from './initiative-status-information.component';

describe('InitiativeStatusInformationComponent', () => {
  let component: InitiativeStatusInformationComponent;
  let fixture: ComponentFixture<InitiativeStatusInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeStatusInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeStatusInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
