import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PobImpactAreaComponent } from './pob-impact-area.component';

describe('PobImpactAreaComponent', () => {
  let component: PobImpactAreaComponent;
  let fixture: ComponentFixture<PobImpactAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PobImpactAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PobImpactAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
