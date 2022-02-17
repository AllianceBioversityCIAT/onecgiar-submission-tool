import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcWpAndGeoFocusComponent } from './pc-wp-and-geo-focus.component';

describe('PcWpAndGeoFocusComponent', () => {
  let component: PcWpAndGeoFocusComponent;
  let fixture: ComponentFixture<PcWpAndGeoFocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcWpAndGeoFocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcWpAndGeoFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
