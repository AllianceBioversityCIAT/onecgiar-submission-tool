import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPartnersComponent } from './key-partners.component';

describe('KeyPartnersComponent', () => {
  let component: KeyPartnersComponent;
  let fixture: ComponentFixture<KeyPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
