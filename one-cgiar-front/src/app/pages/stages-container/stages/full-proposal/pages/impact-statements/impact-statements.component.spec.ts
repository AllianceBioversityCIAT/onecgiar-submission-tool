import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactStatementsComponent } from './impact-statements.component';

describe('ImpactStatementsComponent', () => {
  let component: ImpactStatementsComponent;
  let fixture: ComponentFixture<ImpactStatementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactStatementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
