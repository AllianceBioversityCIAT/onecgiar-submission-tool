import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeTeamItemComponent } from './initiative-team-item.component';

describe('InitiativeTeamItemComponent', () => {
  let component: InitiativeTeamItemComponent;
  let fixture: ComponentFixture<InitiativeTeamItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeTeamItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeTeamItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
