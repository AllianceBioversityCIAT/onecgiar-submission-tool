import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PobDimensionComponent } from './pob-dimension.component';

describe('PobDimensionComponent', () => {
  let component: PobDimensionComponent;
  let fixture: ComponentFixture<PobDimensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PobDimensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PobDimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
