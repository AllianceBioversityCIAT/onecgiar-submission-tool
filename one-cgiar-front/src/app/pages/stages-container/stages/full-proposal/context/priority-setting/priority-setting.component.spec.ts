import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritySettingComponent } from './priority-setting.component';

describe('PrioritySettingComponent', () => {
  let component: PrioritySettingComponent;
  let fixture: ComponentFixture<PrioritySettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritySettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
