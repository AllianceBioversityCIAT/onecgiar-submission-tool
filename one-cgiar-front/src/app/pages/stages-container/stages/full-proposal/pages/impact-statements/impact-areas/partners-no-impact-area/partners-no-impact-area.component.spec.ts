import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersNoImpactAreaComponent } from './partners-no-impact-area.component';

describe('PartnersNoImpactAreaComponent', () => {
  let component: PartnersNoImpactAreaComponent;
  let fixture: ComponentFixture<PartnersNoImpactAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnersNoImpactAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersNoImpactAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
