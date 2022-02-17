import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsReportsComponent } from './is-reports.component';

describe('IsReportsComponent', () => {
  let component: IsReportsComponent;
  let fixture: ComponentFixture<IsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
