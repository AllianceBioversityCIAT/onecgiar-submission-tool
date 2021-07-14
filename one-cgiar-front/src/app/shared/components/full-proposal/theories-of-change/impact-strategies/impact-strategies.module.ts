import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpactStrategiesRoutingModule } from './impact-strategies-routing.module';
import { ImpactStrategiesComponent } from './impact-strategies.component';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [ImpactStrategiesComponent],
  imports: [
    CommonModule,
    ImpactStrategiesRoutingModule,
    UtilsModule
  ]
})
export class ImpactStrategiesModule { }
