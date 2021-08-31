import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpWorkPackageComponent } from './fp-work-package.component';

describe('FpWorkPackageComponent', () => {
  let component: FpWorkPackageComponent;
  let fixture: ComponentFixture<FpWorkPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpWorkPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpWorkPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
