import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpWorkPackagesComponent } from './fp-work-packages.component';

describe('FpWorkPackagesComponent', () => {
  let component: FpWorkPackagesComponent;
  let fixture: ComponentFixture<FpWorkPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpWorkPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpWorkPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
