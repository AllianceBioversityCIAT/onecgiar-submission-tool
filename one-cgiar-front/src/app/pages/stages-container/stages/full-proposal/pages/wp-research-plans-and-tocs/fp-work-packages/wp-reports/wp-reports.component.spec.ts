import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpReportsComponent } from './wp-reports.component';

describe('WpReportsComponent', () => {
  let component: WpReportsComponent;
  let fixture: ComponentFixture<WpReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
