import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchGovernanceComponent } from './research-governance.component';

describe('ResearchGovernanceComponent', () => {
  let component: ResearchGovernanceComponent;
  let fixture: ComponentFixture<ResearchGovernanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchGovernanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchGovernanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
