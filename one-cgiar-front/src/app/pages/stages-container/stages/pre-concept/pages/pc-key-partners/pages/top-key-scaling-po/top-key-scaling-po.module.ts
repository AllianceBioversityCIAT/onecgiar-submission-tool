import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopKeyScalingPoRoutingModule } from './top-key-scaling-po-routing.module';
import { TopKeyScalingPoComponent } from './top-key-scaling-po.component';
import { PcCommonModulesModule } from '../../../pc-common-modules.module';


@NgModule({
  declarations: [TopKeyScalingPoComponent],
  imports: [
    CommonModule,
    TopKeyScalingPoRoutingModule,
    PcCommonModulesModule
  ]
})
export class TopKeyScalingPoModule { }
