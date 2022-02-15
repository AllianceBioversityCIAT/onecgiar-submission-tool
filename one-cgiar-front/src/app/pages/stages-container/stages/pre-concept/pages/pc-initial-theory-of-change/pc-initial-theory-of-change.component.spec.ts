import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcInitialTheoryOfChangeComponent } from './pc-initial-theory-of-change.component';

describe('PcInitialTheoryOfChangeComponent', () => {
  let component: PcInitialTheoryOfChangeComponent;
  let fixture: ComponentFixture<PcInitialTheoryOfChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcInitialTheoryOfChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcInitialTheoryOfChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
