import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoriesOfChangeComponent } from './theories-of-change.component';

describe('TheoriesOfChangeComponent', () => {
  let component: TheoriesOfChangeComponent;
  let fixture: ComponentFixture<TheoriesOfChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheoriesOfChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheoriesOfChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
