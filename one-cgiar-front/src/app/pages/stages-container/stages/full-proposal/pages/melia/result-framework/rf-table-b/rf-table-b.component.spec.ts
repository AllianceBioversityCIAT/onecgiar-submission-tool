import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfTableBComponent } from './rf-table-b.component';

describe('RfTableBComponent', () => {
  let component: RfTableBComponent;
  let fixture: ComponentFixture<RfTableBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfTableBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfTableBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
