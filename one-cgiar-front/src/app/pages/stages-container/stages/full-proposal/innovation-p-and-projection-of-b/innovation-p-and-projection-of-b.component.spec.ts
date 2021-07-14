import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationPAndProjectionOfBComponent } from './innovation-p-and-projection-of-b.component';

describe('InnovationPAndProjectionOfBComponent', () => {
  let component: InnovationPAndProjectionOfBComponent;
  let fixture: ComponentFixture<InnovationPAndProjectionOfBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationPAndProjectionOfBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationPAndProjectionOfBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
