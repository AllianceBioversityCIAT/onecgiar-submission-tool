import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcKeyPartnersComponent } from './pc-key-partners.component';

describe('PcKeyPartnersComponent', () => {
  let component: PcKeyPartnersComponent;
  let fixture: ComponentFixture<PcKeyPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcKeyPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcKeyPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
