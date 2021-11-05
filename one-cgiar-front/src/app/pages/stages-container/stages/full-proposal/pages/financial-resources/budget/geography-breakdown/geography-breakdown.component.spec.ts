import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographyBreakdownComponent } from './geography-breakdown.component';

describe('GeographyBreakdownComponent', () => {
  let component: GeographyBreakdownComponent;
  let fixture: ComponentFixture<GeographyBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeographyBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeographyBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
