import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmpgTableComponent } from './smpg-table.component';

describe('SmpgTableComponent', () => {
  let component: SmpgTableComponent;
  let fixture: ComponentFixture<SmpgTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmpgTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmpgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
