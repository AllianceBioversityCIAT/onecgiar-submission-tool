import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcResultsImpactAreasRoutingModule } from './pc-results-impact-areas-routing.module';
import { PcResultsImpactAreasComponent } from './pc-results-impact-areas.component';
import { PcCommonModulesModule } from '../../../pc-common-modules.module';


@NgModule({
  declarations: [PcResultsImpactAreasComponent],
  imports: [
    CommonModule,
    PcResultsImpactAreasRoutingModule,
    PcCommonModulesModule
  ]
})
export class PcResultsImpactAreasModule { }
