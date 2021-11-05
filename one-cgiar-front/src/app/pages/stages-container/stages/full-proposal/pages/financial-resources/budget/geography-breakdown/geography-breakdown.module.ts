import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeographyBreakdownRoutingModule } from './geography-breakdown-routing.module';
import { GeographyBreakdownComponent } from './geography-breakdown.component';


@NgModule({
  declarations: [GeographyBreakdownComponent],
  imports: [
    CommonModule,
    GeographyBreakdownRoutingModule
  ]
})
export class GeographyBreakdownModule { }
