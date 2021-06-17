import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeasurableObjectivesRoutingModule } from './measurable-objectives-routing.module';
import { MeasurableObjectivesComponent } from './measurable-objectives.component';


@NgModule({
  declarations: [MeasurableObjectivesComponent],
  imports: [
    CommonModule,
    MeasurableObjectivesRoutingModule
  ]
})
export class MeasurableObjectivesModule { }
