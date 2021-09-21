import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityDevelopmentComponent } from './capacity-development.component';

describe('CapacityDevelopmentComponent', () => {
  let component: CapacityDevelopmentComponent;
  let fixture: ComponentFixture<CapacityDevelopmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacityDevelopmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
