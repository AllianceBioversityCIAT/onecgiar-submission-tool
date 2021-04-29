import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInformationWorkPackageComponent } from './general-information-work-package.component';

describe('GeneralInformationWorkPackageComponent', () => {
  let component: GeneralInformationWorkPackageComponent;
  let fixture: ComponentFixture<GeneralInformationWorkPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralInformationWorkPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInformationWorkPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
