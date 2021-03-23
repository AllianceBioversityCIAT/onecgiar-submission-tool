import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPackageComponent } from './work-package.component';

describe('WorkPackageComponent', () => {
  let component: WorkPackageComponent;
  let fixture: ComponentFixture<WorkPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
