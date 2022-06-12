import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPartnersConceptComponent } from './key-partners-concept.component';

describe('KeyPartnersConceptComponent', () => {
  let component: KeyPartnersConceptComponent;
  let fixture: ComponentFixture<KeyPartnersConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyPartnersConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyPartnersConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
