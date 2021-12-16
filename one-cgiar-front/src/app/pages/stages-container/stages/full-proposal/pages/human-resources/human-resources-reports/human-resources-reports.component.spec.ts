import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanResourcesReportsComponent } from './human-resources-reports.component';

describe('HumanResourcesReportsComponent', () => {
  let component: HumanResourcesReportsComponent;
  let fixture: ComponentFixture<HumanResourcesReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumanResourcesReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanResourcesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
