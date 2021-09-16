import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeliaPlanComponent } from './melia-plan.component';

describe('MeliaPlanComponent', () => {
  let component: MeliaPlanComponent;
  let fixture: ComponentFixture<MeliaPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeliaPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeliaPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
