import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMoreContainerComponent } from './read-more-container.component';

describe('ReadMoreContainerComponent', () => {
  let component: ReadMoreContainerComponent;
  let fixture: ComponentFixture<ReadMoreContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadMoreContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoreContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
