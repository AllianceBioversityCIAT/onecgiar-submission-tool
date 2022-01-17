import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcInnovationsComponent } from './pc-innovations.component';

describe('PcInnovationsComponent', () => {
  let component: PcInnovationsComponent;
  let fixture: ComponentFixture<PcInnovationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcInnovationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcInnovationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
