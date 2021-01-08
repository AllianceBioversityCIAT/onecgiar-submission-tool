import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NarrativesConceptComponent } from './narratives-concept.component';

describe('NarrativesConceptComponent', () => {
  let component: NarrativesConceptComponent;
  let fixture: ComponentFixture<NarrativesConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NarrativesConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarrativesConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
