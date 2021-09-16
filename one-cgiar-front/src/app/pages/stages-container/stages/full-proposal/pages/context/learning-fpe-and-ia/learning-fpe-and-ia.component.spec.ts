import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningFpeAndIaComponent } from './learning-fpe-and-ia.component';

describe('LearningFpeAndIaComponent', () => {
  let component: LearningFpeAndIaComponent;
  let fixture: ComponentFixture<LearningFpeAndIaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningFpeAndIaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningFpeAndIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
