import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitTableComponent } from './init-table.component';

describe('InitTableComponent', () => {
  let component: InitTableComponent;
  let fixture: ComponentFixture<InitTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
