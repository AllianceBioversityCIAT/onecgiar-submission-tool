import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPackageTOCComponent } from './work-package-toc.component';

describe('WorkPackageTOCComponent', () => {
  let component: WorkPackageTOCComponent;
  let fixture: ComponentFixture<WorkPackageTOCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPackageTOCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPackageTOCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
