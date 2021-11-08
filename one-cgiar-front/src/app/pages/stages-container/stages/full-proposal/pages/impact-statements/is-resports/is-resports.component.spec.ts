import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsResportsComponent } from './is-resports.component';

describe('IsResportsComponent', () => {
  let component: IsResportsComponent;
  let fixture: ComponentFixture<IsResportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsResportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsResportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
