import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBreakdownComponent } from './activity-breakdown.component';

describe('ActivityBreakdownComponent', () => {
  let component: ActivityBreakdownComponent;
  let fixture: ComponentFixture<ActivityBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
