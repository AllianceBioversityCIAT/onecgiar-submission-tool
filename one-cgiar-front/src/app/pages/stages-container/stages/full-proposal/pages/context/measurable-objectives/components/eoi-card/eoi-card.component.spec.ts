import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EoiCardComponent } from './eoi-card.component';

describe('EoiCardComponent', () => {
  let component: EoiCardComponent;
  let fixture: ComponentFixture<EoiCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EoiCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EoiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
