import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfTableAComponent } from './rf-table-a.component';

describe('RfTableAComponent', () => {
  let component: RfTableAComponent;
  let fixture: ComponentFixture<RfTableAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfTableAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfTableAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
