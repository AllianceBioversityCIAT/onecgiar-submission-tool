import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevPanelComponent } from './dev-panel.component';

describe('DevPanelComponent', () => {
  let component: DevPanelComponent;
  let fixture: ComponentFixture<DevPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
