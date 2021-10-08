import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpsTableComponent } from './wps-table.component';

describe('WpsTableComponent', () => {
  let component: WpsTableComponent;
  let fixture: ComponentFixture<WpsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
