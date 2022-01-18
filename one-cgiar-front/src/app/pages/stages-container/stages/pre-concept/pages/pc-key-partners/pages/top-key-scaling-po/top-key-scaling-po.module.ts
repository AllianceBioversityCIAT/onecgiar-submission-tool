import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopKeyScalingPoRoutingModule } from './top-key-scaling-po-routing.module';
import { TopKeyScalingPoComponent } from './top-key-scaling-po.component';


@NgModule({
  declarations: [TopKeyScalingPoComponent],
  imports: [
    CommonModule,
    TopKeyScalingPoRoutingModule
  ]
})
export class TopKeyScalingPoModule { }
