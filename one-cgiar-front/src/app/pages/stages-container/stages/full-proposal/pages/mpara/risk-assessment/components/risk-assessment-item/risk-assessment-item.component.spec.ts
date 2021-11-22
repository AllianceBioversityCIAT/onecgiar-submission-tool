import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAssessmentItemComponent } from './risk-assessment-item.component';

describe('RiskAssessmentItemComponent', () => {
  let component: RiskAssessmentItemComponent;
  let fixture: ComponentFixture<RiskAssessmentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskAssessmentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskAssessmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
