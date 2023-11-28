import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeasurableObjectivesRoutingModule } from './measurable-objectives-routing.module';
import { MeasurableObjectivesComponent } from './measurable-objectives.component';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/public-api';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { EoiCardModule } from './components/eoi-card/eoi-card.module';
import { EditTocButtonModule } from '../../../../../../../shared/components/edit-toc-button/edit-toc-button.module';
import { ToggleFormatDateModule } from '../../../../../../../shared/components/toggle-format-date/toggle-format-date.module';


@NgModule({
  declarations: [MeasurableObjectivesComponent],
  imports: [
    CommonModule,
    MeasurableObjectivesRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    EoiCardModule,
    EditTocButtonModule,
    ToggleFormatDateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MeasurableObjectivesModule { }
