import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReFreImpactAreaComponent } from './re-fre-impact-area.component';

describe('ReFreImpactAreaComponent', () => {
  let component: ReFreImpactAreaComponent;
  let fixture: ComponentFixture<ReFreImpactAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReFreImpactAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReFreImpactAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
