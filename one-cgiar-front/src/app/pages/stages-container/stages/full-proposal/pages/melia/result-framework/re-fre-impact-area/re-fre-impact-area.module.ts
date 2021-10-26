import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReFreImpactAreaRoutingModule } from './re-fre-impact-area-routing.module';
import { ReFreImpactAreaComponent } from './re-fre-impact-area.component';
import { CustomSteperModule } from '../../../../../shared/components/custom-steper/custom-steper.module';


@NgModule({
  declarations: [ReFreImpactAreaComponent],
  imports: [
    CommonModule,
    ReFreImpactAreaRoutingModule,
    CustomSteperModule
  ]
})
export class ReFreImpactAreaModule { }
