import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcGlobalBudgetComponent } from './pc-global-budget.component';

describe('PcGlobalBudgetComponent', () => {
  let component: PcGlobalBudgetComponent;
  let fixture: ComponentFixture<PcGlobalBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcGlobalBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcGlobalBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
