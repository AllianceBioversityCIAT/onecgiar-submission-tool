import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativeAdvantageComponent } from './comparative-advantage.component';

describe('ComparativeAdvantageComponent', () => {
  let component: ComparativeAdvantageComponent;
  let fixture: ComponentFixture<ComparativeAdvantageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparativeAdvantageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativeAdvantageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
