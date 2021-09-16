import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoConceptComponent } from './general-info-concept.component';

describe('GeneralInfoConceptComponent', () => {
  let component: GeneralInfoConceptComponent;
  let fixture: ComponentFixture<GeneralInfoConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralInfoConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInfoConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
