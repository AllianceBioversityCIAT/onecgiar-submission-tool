import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionOfBenefitsWorkPackageComponent } from './projection-of-benefits-work-package.component';

describe('ProjectionOfBenefitsWorkPackageComponent', () => {
  let component: ProjectionOfBenefitsWorkPackageComponent;
  let fixture: ComponentFixture<ProjectionOfBenefitsWorkPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionOfBenefitsWorkPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionOfBenefitsWorkPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
