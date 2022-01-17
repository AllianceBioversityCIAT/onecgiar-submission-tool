import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcInnovationsRoutingModule } from './pc-innovations-routing.module';
import { PcInnovationsComponent } from './pc-innovations.component';


@NgModule({
  declarations: [PcInnovationsComponent],
  imports: [
    CommonModule,
    PcInnovationsRoutingModule
  ]
})
export class PcInnovationsModule { }
