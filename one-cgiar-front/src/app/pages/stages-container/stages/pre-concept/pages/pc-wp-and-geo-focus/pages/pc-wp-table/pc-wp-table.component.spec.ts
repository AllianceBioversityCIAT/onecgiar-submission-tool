import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcWpTableComponent } from './pc-wp-table.component';

describe('PcWpTableComponent', () => {
  let component: PcWpTableComponent;
  let fixture: ComponentFixture<PcWpTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcWpTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcWpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
