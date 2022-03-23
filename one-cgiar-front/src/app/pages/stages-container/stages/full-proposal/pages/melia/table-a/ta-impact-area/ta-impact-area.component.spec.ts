import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaImpactAreaComponent } from './ta-impact-area.component';

describe('TaImpactAreaComponent', () => {
  let component: TaImpactAreaComponent;
  let fixture: ComponentFixture<TaImpactAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaImpactAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaImpactAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
