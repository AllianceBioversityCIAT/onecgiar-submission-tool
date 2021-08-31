import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeStatementComponent } from './challenge-statement.component';

describe('ChallengeStatementComponent', () => {
  let component: ChallengeStatementComponent;
  let fixture: ComponentFixture<ChallengeStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
