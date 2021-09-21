import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPartnersRequestComponent } from './global-partners-request.component';

describe('GlobalPartnersRequestComponent', () => {
  let component: GlobalPartnersRequestComponent;
  let fixture: ComponentFixture<GlobalPartnersRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalPartnersRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalPartnersRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
