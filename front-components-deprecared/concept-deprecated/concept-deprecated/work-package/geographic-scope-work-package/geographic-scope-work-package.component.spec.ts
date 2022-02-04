import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicScopeWorkPackageComponent } from './geographic-scope-work-package.component';

describe('GeographicScopeWorkPackageComponent', () => {
  let component: GeographicScopeWorkPackageComponent;
  let fixture: ComponentFixture<GeographicScopeWorkPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeographicScopeWorkPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeographicScopeWorkPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
