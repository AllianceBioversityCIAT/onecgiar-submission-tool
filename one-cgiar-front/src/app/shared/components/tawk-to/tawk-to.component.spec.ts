import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TawkToComponent } from './tawk-to.component';

describe('TawkToComponent', () => {
  let component: TawkToComponent;
  let fixture: ComponentFixture<TawkToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TawkToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TawkToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
