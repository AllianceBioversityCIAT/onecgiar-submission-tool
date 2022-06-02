import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionOfInterestComponent } from './section-of-interest.component';

describe('SectionOfInterestComponent', () => {
  let component: SectionOfInterestComponent;
  let fixture: ComponentFixture<SectionOfInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionOfInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
