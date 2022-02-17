import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopKeyDemandPoComponent } from './top-key-demand-po.component';

describe('TopKeyDemandPoComponent', () => {
  let component: TopKeyDemandPoComponent;
  let fixture: ComponentFixture<TopKeyDemandPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopKeyDemandPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopKeyDemandPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
