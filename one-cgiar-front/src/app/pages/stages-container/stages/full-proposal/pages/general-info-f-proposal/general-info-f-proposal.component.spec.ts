import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoFProposalComponent } from './general-info-f-proposal.component';

describe('GeneralInfoFProposalComponent', () => {
  let component: GeneralInfoFProposalComponent;
  let fixture: ComponentFixture<GeneralInfoFProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralInfoFProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInfoFProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
