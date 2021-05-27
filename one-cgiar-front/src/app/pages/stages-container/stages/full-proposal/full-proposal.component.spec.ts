import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullProposalComponent } from './full-proposal.component';

describe('FullProposalComponent', () => {
  let component: FullProposalComponent;
  let fixture: ComponentFixture<FullProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
