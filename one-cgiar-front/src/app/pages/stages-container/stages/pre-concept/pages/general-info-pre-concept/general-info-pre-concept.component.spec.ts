import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoPreConceptComponent } from './general-info-pre-concept.component';

describe('GeneralInfoPreConceptComponent', () => {
  let component: GeneralInfoPreConceptComponent;
  let fixture: ComponentFixture<GeneralInfoPreConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralInfoPreConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInfoPreConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
