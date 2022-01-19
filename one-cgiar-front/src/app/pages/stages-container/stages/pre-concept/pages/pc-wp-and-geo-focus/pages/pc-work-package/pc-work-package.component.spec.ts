import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcWorkPackageComponent } from './pc-work-package.component';

describe('PcWorkPackageComponent', () => {
  let component: PcWorkPackageComponent;
  let fixture: ComponentFixture<PcWorkPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcWorkPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcWorkPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
