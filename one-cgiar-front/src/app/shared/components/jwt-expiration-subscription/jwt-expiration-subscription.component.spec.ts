import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtExpirationSubscriptionComponent } from './jwt-expiration-subscription.component';

describe('JwtExpirationSubscriptionComponent', () => {
  let component: JwtExpirationSubscriptionComponent;
  let fixture: ComponentFixture<JwtExpirationSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JwtExpirationSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JwtExpirationSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
