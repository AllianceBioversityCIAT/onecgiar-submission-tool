import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactAreaComponent } from './impact-area.component';

describe('ImpactAreaComponent', () => {
  let component: ImpactAreaComponent;
  let fixture: ComponentFixture<ImpactAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
