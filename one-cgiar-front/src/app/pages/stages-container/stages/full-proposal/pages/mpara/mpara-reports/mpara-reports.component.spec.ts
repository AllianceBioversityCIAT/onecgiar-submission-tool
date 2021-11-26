import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MparaReportsComponent } from './mpara-reports.component';

describe('MparaReportsComponent', () => {
  let component: MparaReportsComponent;
  let fixture: ComponentFixture<MparaReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MparaReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MparaReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
