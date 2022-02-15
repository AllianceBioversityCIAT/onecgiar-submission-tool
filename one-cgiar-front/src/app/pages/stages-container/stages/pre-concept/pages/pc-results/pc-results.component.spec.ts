import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcResultsComponent } from './pc-results.component';

describe('PcResultsComponent', () => {
  let component: PcResultsComponent;
  let fixture: ComponentFixture<PcResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
