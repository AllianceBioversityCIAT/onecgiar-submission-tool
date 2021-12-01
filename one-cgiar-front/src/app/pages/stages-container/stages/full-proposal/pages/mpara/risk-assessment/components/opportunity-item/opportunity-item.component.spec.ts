import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityItemComponent } from './opportunity-item.component';

describe('OpportunityItemComponent', () => {
  let component: OpportunityItemComponent;
  let fixture: ComponentFixture<OpportunityItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
