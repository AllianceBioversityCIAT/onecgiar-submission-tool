import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PobImpactAreaRoutingModule } from './pob-impact-area-routing.module';
import { PobImpactAreaComponent } from './pob-impact-area.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [PobImpactAreaComponent],
  imports: [
    CommonModule,
    PobImpactAreaRoutingModule,
    UtilsModule
  ]
})
export class PobImpactAreaModule { }
