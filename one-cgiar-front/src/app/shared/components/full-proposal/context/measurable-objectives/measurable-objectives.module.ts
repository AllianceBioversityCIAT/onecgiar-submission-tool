import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeasurableObjectivesRoutingModule } from './measurable-objectives-routing.module';
import { MeasurableObjectivesComponent } from './measurable-objectives.component';
import { UtilsModule } from '../../../utils/utils.module';
import { IbdAngularComponentsModule } from '../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MeasurableObjectivesComponent],
  imports: [
    CommonModule,
    MeasurableObjectivesRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MeasurableObjectivesModule { }
