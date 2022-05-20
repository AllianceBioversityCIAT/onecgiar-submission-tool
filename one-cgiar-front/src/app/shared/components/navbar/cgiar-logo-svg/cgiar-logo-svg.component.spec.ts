import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgiarLogoSvgComponent } from './cgiar-logo-svg.component';

describe('CgiarLogoSvgComponent', () => {
  let component: CgiarLogoSvgComponent;
  let fixture: ComponentFixture<CgiarLogoSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgiarLogoSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgiarLogoSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
