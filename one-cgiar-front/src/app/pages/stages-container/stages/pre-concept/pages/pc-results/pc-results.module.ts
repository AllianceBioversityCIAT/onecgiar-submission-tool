import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcResultsRoutingModule } from './pc-results-routing.module';
import { PcResultsComponent } from './pc-results.component';
import { PcCommonModulesModule } from '../pc-common-modules.module';


@NgModule({
  declarations: [PcResultsComponent],
  imports: [
    CommonModule,
    PcResultsRoutingModule,
    PcCommonModulesModule
  ]
})
export class PcResultsModule { }
