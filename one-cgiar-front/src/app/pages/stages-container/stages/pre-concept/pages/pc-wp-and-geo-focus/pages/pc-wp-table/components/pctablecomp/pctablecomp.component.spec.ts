import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PctablecompComponent } from './pctablecomp.component';

describe('PctablecompComponent', () => {
  let component: PctablecompComponent;
  let fixture: ComponentFixture<PctablecompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PctablecompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PctablecompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
