import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcInnovationsRoutingModule } from './pc-innovations-routing.module';
import { PcInnovationsComponent } from './pc-innovations.component';
import { PcCommonModulesModule } from '../pc-common-modules.module';


@NgModule({
  declarations: [PcInnovationsComponent],
  imports: [
    CommonModule,
    PcInnovationsRoutingModule,
    PcCommonModulesModule
  ]
})
export class PcInnovationsModule { }
