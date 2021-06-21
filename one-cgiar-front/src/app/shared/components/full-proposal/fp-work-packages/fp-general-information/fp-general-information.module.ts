import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FpGeneralInformationRoutingModule } from './fp-general-information-routing.module';
import { FpGeneralInformationComponent } from './fp-general-information.component';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [FpGeneralInformationComponent],
  imports: [
    CommonModule,
    FpGeneralInformationRoutingModule,
    UtilsModule
  ]
})
export class FpGeneralInformationModule { }
