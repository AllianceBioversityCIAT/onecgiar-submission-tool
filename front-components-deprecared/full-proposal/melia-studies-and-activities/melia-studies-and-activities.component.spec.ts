import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeliaStudiesAndActivitiesComponent } from './melia-studies-and-activities.component';

describe('MeliaStudiesAndActivitiesComponent', () => {
  let component: MeliaStudiesAndActivitiesComponent;
  let fixture: ComponentFixture<MeliaStudiesAndActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeliaStudiesAndActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeliaStudiesAndActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
