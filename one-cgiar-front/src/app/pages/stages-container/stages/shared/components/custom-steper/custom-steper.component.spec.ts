import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSteperComponent } from './custom-steper.component';

describe('CustomSteperComponent', () => {
  let component: CustomSteperComponent;
  let fixture: ComponentFixture<CustomSteperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSteperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSteperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
