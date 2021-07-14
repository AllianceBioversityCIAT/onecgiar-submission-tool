import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpGeneralInformationComponent } from './fp-general-information.component';

describe('FpGeneralInformationComponent', () => {
  let component: FpGeneralInformationComponent;
  let fixture: ComponentFixture<FpGeneralInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpGeneralInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpGeneralInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
