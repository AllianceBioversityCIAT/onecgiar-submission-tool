import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaImpactAreaRoutingModule } from './ta-impact-area-routing.module';
import { TaImpactAreaComponent } from './ta-impact-area.component';


@NgModule({
  declarations: [TaImpactAreaComponent],
  imports: [
    CommonModule,
    TaImpactAreaRoutingModule
  ]
})
export class TaImpactAreaModule { }
