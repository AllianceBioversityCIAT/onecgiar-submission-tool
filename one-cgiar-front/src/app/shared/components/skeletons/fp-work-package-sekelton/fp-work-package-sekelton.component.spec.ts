import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpWorkPackageSekeltonComponent } from './fp-work-package-sekelton.component';

describe('FpWorkPackageSekeltonComponent', () => {
  let component: FpWorkPackageSekeltonComponent;
  let fixture: ComponentFixture<FpWorkPackageSekeltonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpWorkPackageSekeltonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpWorkPackageSekeltonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
