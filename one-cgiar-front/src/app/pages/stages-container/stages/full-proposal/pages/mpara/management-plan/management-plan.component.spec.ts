import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPlanComponent } from './management-plan.component';

describe('ManagementPlanComponent', () => {
  let component: ManagementPlanComponent;
  let fixture: ComponentFixture<ManagementPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
