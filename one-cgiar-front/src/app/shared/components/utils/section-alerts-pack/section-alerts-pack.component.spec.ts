import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAlertsPackComponent } from './section-alerts-pack.component';

describe('SectionAlertsPackComponent', () => {
  let component: SectionAlertsPackComponent;
  let fixture: ComponentFixture<SectionAlertsPackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionAlertsPackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionAlertsPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
