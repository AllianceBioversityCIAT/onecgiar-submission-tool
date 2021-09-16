import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MparaComponent } from './mpara.component';

describe('MparaComponent', () => {
  let component: MparaComponent;
  let fixture: ComponentFixture<MparaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MparaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MparaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
