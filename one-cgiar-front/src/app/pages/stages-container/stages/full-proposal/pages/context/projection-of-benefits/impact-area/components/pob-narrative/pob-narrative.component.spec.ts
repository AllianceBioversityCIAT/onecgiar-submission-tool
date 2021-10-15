import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PobNarrativeComponent } from './pob-narrative.component';

describe('PobNarrativeComponent', () => {
  let component: PobNarrativeComponent;
  let fixture: ComponentFixture<PobNarrativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PobNarrativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PobNarrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
