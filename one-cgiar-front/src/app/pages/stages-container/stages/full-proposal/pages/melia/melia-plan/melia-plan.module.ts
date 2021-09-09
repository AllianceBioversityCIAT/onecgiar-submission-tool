import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeliaPlanRoutingModule } from './melia-plan-routing.module';
import { MeliaPlanComponent } from './melia-plan.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [MeliaPlanComponent],
  imports: [
    CommonModule,
    MeliaPlanRoutingModule,
    UtilsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MeliaPlanModule { }
