import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTocButtonComponent } from './edit-toc-button.component';

describe('EditTocButtonComponent', () => {
  let component: EditTocButtonComponent;
  let fixture: ComponentFixture<EditTocButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTocButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTocButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
