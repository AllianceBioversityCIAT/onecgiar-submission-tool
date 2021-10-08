import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyComplianceAndOversightComponent } from './policy-compliance-and-oversight.component';

describe('PolicyComplianceAndOversightComponent', () => {
  let component: PolicyComplianceAndOversightComponent;
  let fixture: ComponentFixture<PolicyComplianceAndOversightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyComplianceAndOversightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyComplianceAndOversightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
