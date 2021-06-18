import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeasurableObjectivesRoutingModule } from './measurable-objectives-routing.module';
import { MeasurableObjectivesComponent } from './measurable-objectives.component';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [MeasurableObjectivesComponent],
  imports: [
    CommonModule,
    MeasurableObjectivesRoutingModule,
    UtilsModule
  ]
})
export class MeasurableObjectivesModule { }
