import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionOfBenefitsComponent } from './projection-of-benefits.component';

describe('ProjectionOfBenefitsComponent', () => {
  let component: ProjectionOfBenefitsComponent;
  let fixture: ComponentFixture<ProjectionOfBenefitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionOfBenefitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionOfBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
