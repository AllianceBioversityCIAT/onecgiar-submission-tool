import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderDiwComponent } from './gender-diw.component';

describe('GenderDiwComponent', () => {
  let component: GenderDiwComponent;
  let fixture: ComponentFixture<GenderDiwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenderDiwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderDiwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
