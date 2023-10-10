import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSelectItemComponent } from './multiple-select-item.component';

describe('MultipleSelectItemComponent', () => {
  let component: MultipleSelectItemComponent;
  let fixture: ComponentFixture<MultipleSelectItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleSelectItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleSelectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
