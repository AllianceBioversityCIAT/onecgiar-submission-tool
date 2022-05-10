import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedButtonComponent } from './animated-button.component';

describe('AnimatedButtonComponent', () => {
  let component: AnimatedButtonComponent;
  let fixture: ComponentFixture<AnimatedButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
