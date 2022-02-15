import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopKeyDemandPoRoutingModule } from './top-key-demand-po-routing.module';
import { TopKeyDemandPoComponent } from './top-key-demand-po.component';
import { PcCommonModulesModule } from '../../../pc-common-modules.module';


@NgModule({
  declarations: [TopKeyDemandPoComponent],
  imports: [
    CommonModule,
    TopKeyDemandPoRoutingModule,
    PcCommonModulesModule
  ]
})
export class TopKeyDemandPoModule { }
