import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcResultsImpactAreasComponent } from './pc-results-impact-areas.component';

describe('PcResultsImpactAreasComponent', () => {
  let component: PcResultsImpactAreasComponent;
  let fixture: ComponentFixture<PcResultsImpactAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcResultsImpactAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcResultsImpactAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
