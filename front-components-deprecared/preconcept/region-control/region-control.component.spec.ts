import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionControlComponent } from './region-control.component';

describe('RegionControlComponent', () => {
  let component: RegionControlComponent;
  let fixture: ComponentFixture<RegionControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
