import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationPAndScalingRsComponent } from './innovation-p-and-scaling-rs.component';

describe('InnovationPAndScalingRsComponent', () => {
  let component: InnovationPAndScalingRsComponent;
  let fixture: ComponentFixture<InnovationPAndScalingRsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationPAndScalingRsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationPAndScalingRsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
