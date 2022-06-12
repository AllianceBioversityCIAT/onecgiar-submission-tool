import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcInitiativeStatementsComponent } from './pc-initiative-statements.component';

describe('PcInitiativeStatementsComponent', () => {
  let component: PcInitiativeStatementsComponent;
  let fixture: ComponentFixture<PcInitiativeStatementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcInitiativeStatementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcInitiativeStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
