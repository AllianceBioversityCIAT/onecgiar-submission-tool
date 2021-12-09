import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextNotDataComponent } from './text-not-data.component';

describe('TextNotDataComponent', () => {
  let component: TextNotDataComponent;
  let fixture: ComponentFixture<TextNotDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextNotDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextNotDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
