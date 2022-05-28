import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsdcFeedbackResponsesComponent } from './isdc-feedback-responses.component';

describe('IsdcFeedbackResponsesComponent', () => {
  let component: IsdcFeedbackResponsesComponent;
  let fixture: ComponentFixture<IsdcFeedbackResponsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsdcFeedbackResponsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsdcFeedbackResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
