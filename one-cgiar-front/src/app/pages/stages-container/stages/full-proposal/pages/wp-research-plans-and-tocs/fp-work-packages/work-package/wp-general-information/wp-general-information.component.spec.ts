import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpGeneralInformationComponent } from './wp-general-information.component';

describe('WpGeneralInformationComponent', () => {
  let component: WpGeneralInformationComponent;
  let fixture: ComponentFixture<WpGeneralInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpGeneralInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpGeneralInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
