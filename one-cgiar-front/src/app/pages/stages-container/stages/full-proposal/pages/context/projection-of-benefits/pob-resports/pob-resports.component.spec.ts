import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PobResportsComponent } from './pob-resports.component';

describe('PobResportsComponent', () => {
  let component: PobResportsComponent;
  let fixture: ComponentFixture<PobResportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PobResportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PobResportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
