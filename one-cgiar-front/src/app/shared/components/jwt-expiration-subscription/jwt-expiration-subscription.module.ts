import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtExpirationSubscriptionComponent } from './jwt-expiration-subscription.component';
import { LoginCardModule } from '../login-card/login-card.module';



@NgModule({
  declarations: [JwtExpirationSubscriptionComponent],
  exports: [JwtExpirationSubscriptionComponent],
  imports: [
    CommonModule,
    LoginCardModule
  ]
})
export class JwtExpirationSubscriptionModule { }
