import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPackagesComponent } from './work-packages.component';

describe('WorkPackagesComponent', () => {
  let component: WorkPackagesComponent;
  let fixture: ComponentFixture<WorkPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
