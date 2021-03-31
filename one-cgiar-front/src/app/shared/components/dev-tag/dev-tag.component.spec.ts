import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevTagComponent } from './dev-tag.component';

describe('DevTagComponent', () => {
  let component: DevTagComponent;
  let fixture: ComponentFixture<DevTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
