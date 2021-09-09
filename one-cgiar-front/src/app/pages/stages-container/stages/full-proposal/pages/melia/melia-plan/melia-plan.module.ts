import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeliaPlanRoutingModule } from './melia-plan-routing.module';
import { MeliaPlanComponent } from './melia-plan.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';

@NgModule({
  declarations: [MeliaPlanComponent],
  imports: [
    CommonModule,
    MeliaPlanRoutingModule,
    IbdAngularComponentsModule,
    UtilsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MeliaPlanModule { }
