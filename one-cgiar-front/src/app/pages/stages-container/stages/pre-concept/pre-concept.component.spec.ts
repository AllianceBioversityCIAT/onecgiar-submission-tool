import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreConceptComponent } from './pre-concept.component';

describe('PreConceptComponent', () => {
  let component: PreConceptComponent;
  let fixture: ComponentFixture<PreConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
