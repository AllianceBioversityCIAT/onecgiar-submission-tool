import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PobReportsComponent } from './pob-reports.component';

describe('PobReportsComponent', () => {
  let component: PobReportsComponent;
  let fixture: ComponentFixture<PobReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PobReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PobReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
