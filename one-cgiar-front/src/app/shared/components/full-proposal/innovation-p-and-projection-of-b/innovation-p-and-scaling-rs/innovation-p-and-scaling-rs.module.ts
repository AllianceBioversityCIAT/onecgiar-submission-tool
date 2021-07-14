import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnovationPAndScalingRsRoutingModule } from './innovation-p-and-scaling-rs-routing.module';
import { InnovationPAndScalingRsComponent } from './innovation-p-and-scaling-rs.component';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [InnovationPAndScalingRsComponent],
  imports: [
    CommonModule,
    InnovationPAndScalingRsRoutingModule,
    UtilsModule
  ]
})
export class InnovationPAndScalingRsModule { }
