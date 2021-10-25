import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfTableCComponent } from './rf-table-c.component';

describe('RfTableCComponent', () => {
  let component: RfTableCComponent;
  let fixture: ComponentFixture<RfTableCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfTableCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfTableCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
