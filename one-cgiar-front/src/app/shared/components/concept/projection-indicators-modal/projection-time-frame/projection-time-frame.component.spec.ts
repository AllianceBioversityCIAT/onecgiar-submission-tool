import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionTimeFrameComponent } from './projection-time-frame.component';

describe('ProjectionTimeFrameComponent', () => {
  let component: ProjectionTimeFrameComponent;
  let fixture: ComponentFixture<ProjectionTimeFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionTimeFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionTimeFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
