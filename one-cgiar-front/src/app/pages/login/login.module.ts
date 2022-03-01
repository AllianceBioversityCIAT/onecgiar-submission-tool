import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginCardModule } from '../../shared/components/login-card/login-card.module';
import { ChangePasswordModule } from '../../shared/components/login/change-password/change-password.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginCommonModulesModule } from './modules/login-common-modules/login-common-modules.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    LoginCardModule,
    ChangePasswordModule,
    NgxSpinnerModule,
    ChangePasswordModule,
    LoginCommonModulesModule,
    LoginCardModule
  ]
})
export class LoginModule { }
