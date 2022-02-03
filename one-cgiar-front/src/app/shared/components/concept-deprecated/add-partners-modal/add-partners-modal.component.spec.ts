import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartnersModalComponent } from './add-partners-modal.component';

describe('AddPartnersModalComponent', () => {
  let component: AddPartnersModalComponent;
  let fixture: ComponentFixture<AddPartnersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartnersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartnersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
