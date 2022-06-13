import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsdcStatusComponent } from './isdc-status.component';

describe('IsdcStatusComponent', () => {
  let component: IsdcStatusComponent;
  let fixture: ComponentFixture<IsdcStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsdcStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsdcStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
