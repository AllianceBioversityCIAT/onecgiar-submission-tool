import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopKeyDemandPoRoutingModule } from './top-key-demand-po-routing.module';
import { TopKeyDemandPoComponent } from './top-key-demand-po.component';


@NgModule({
  declarations: [TopKeyDemandPoComponent],
  imports: [
    CommonModule,
    TopKeyDemandPoRoutingModule
  ]
})
export class TopKeyDemandPoModule { }
