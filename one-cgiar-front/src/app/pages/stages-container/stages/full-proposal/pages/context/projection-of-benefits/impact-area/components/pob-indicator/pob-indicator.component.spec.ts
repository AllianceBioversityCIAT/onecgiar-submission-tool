import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PobIndicatorComponent } from './pob-indicator.component';

describe('PobIndicatorComponent', () => {
  let component: PobIndicatorComponent;
  let fixture: ComponentFixture<PobIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PobIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PobIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
