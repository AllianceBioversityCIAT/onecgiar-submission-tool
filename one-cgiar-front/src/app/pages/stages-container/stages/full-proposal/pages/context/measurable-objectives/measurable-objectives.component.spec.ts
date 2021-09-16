import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurableObjectivesComponent } from './measurable-objectives.component';

describe('MeasurableObjectivesComponent', () => {
  let component: MeasurableObjectivesComponent;
  let fixture: ComponentFixture<MeasurableObjectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurableObjectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurableObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
