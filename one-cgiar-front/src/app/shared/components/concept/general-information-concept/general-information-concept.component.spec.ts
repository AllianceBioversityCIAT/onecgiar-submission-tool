import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInformationConceptComponent } from './general-information-concept.component';

describe('GeneralInformationConceptComponent', () => {
  let component: GeneralInformationConceptComponent;
  let fixture: ComponentFixture<GeneralInformationConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralInformationConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInformationConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
