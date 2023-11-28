import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TocReportingComponent } from './toc-reporting.component';

describe('TocReportingComponent', () => {
  let component: TocReportingComponent;
  let fixture: ComponentFixture<TocReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TocReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TocReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
