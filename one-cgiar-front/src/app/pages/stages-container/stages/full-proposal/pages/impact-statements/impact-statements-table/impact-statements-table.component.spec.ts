import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactStatementsTableComponent } from './impact-statements-table.component';

describe('ImpactStatementsTableComponent', () => {
  let component: ImpactStatementsTableComponent;
  let fixture: ComponentFixture<ImpactStatementsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactStatementsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactStatementsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
