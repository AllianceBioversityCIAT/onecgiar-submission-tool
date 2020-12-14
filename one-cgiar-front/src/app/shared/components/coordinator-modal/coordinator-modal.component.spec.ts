import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorModalComponent } from './coordinator-modal.component';

describe('CoordinatorModalComponent', () => {
  let component: CoordinatorModalComponent;
  let fixture: ComponentFixture<CoordinatorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
