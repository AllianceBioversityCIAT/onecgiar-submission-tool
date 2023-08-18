import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginCardComponent } from './login-card.component';
import { LoginCommonModulesModule } from '../../../pages/login/modules/login-common-modules/login-common-modules.module';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [LoginCardComponent],
  exports: [LoginCardComponent],
  imports: [CommonModule, LoginCommonModulesModule, FooterModule],
})
export class LoginCardModule {}
