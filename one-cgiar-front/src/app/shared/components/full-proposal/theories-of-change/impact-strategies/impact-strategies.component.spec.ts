import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactStrategiesComponent } from './impact-strategies.component';

describe('ImpactStrategiesComponent', () => {
  let component: ImpactStrategiesComponent;
  let fixture: ComponentFixture<ImpactStrategiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactStrategiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactStrategiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
