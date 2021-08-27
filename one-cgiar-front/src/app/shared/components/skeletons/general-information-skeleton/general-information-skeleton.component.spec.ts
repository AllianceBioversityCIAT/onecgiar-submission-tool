import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInformationSkeletonComponent } from './general-information-skeleton.component';

describe('GeneralInformationSkeletonComponent', () => {
  let component: GeneralInformationSkeletonComponent;
  let fixture: ComponentFixture<GeneralInformationSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralInformationSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInformationSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
