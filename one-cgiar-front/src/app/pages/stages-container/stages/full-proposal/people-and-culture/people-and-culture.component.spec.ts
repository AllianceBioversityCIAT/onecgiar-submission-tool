import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleAndCultureComponent } from './people-and-culture.component';

describe('PeopleAndCultureComponent', () => {
  let component: PeopleAndCultureComponent;
  let fixture: ComponentFixture<PeopleAndCultureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleAndCultureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleAndCultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
