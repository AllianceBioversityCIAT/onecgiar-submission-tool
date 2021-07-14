import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderDiversityInclusionComponent } from './gender-diversity-inclusion.component';

describe('GenderDiversityInclusionComponent', () => {
  let component: GenderDiversityInclusionComponent;
  let fixture: ComponentFixture<GenderDiversityInclusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenderDiversityInclusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderDiversityInclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
