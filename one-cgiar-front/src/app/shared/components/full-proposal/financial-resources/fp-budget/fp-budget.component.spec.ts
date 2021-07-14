import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpBudgetComponent } from './fp-budget.component';

describe('FpBudgetComponent', () => {
  let component: FpBudgetComponent;
  let fixture: ComponentFixture<FpBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
