import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SdgMappingRoutingModule } from './sdg-mapping-routing.module';
import { SdgMappingComponent } from './sdg-mapping.component';
import { PcCommonModulesModule } from '../../../pc-common-modules.module';


@NgModule({
  declarations: [SdgMappingComponent],
  imports: [
    CommonModule,
    SdgMappingRoutingModule,
    PcCommonModulesModule
  ]
})
export class SdgMappingModule { }
