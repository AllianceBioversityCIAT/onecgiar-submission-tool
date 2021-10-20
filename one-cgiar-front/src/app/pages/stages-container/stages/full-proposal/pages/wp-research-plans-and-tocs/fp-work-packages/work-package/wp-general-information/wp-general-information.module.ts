import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WpGeneralInformationRoutingModule } from './wp-general-information-routing.module';
import { WpGeneralInformationComponent } from './wp-general-information.component';


@NgModule({
  declarations: [WpGeneralInformationComponent],
  imports: [
    CommonModule,
    WpGeneralInformationRoutingModule
  ]
})
export class WpGeneralInformationModule { }
