import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopKeyScalingPoComponent } from './top-key-scaling-po.component';

describe('TopKeyScalingPoComponent', () => {
  let component: TopKeyScalingPoComponent;
  let fixture: ComponentFixture<TopKeyScalingPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopKeyScalingPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopKeyScalingPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
