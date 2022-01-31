import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionIndicatorsModalComponent } from './projection-indicators-modal.component';

describe('ProjectionIndicatorsModalComponent', () => {
  let component: ProjectionIndicatorsModalComponent;
  let fixture: ComponentFixture<ProjectionIndicatorsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionIndicatorsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionIndicatorsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
