import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcResultsRoutingModule } from './pc-results-routing.module';
import { PcResultsComponent } from './pc-results.component';


@NgModule({
  declarations: [PcResultsComponent],
  imports: [
    CommonModule,
    PcResultsRoutingModule
  ]
})
export class PcResultsModule { }
