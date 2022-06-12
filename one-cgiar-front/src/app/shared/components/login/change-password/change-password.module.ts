import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { LoginCommonModulesModule } from '../../../../pages/login/modules/login-common-modules/login-common-modules.module';


@NgModule({
  declarations: [ChangePasswordComponent],
  exports: [ChangePasswordComponent],
  imports: [
    CommonModule,
    LoginCommonModulesModule
  ]
})
export class ChangePasswordModule { }
