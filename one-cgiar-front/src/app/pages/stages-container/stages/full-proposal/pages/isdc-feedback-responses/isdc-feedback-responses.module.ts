import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IsdcFeedbackResponsesRoutingModule } from './isdc-feedback-responses-routing.module';
import { IsdcFeedbackResponsesComponent } from './isdc-feedback-responses.component';
import { UtilsModule } from '../../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [IsdcFeedbackResponsesComponent],
  imports: [
    CommonModule,
    IsdcFeedbackResponsesRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class IsdcFeedbackResponsesModule { }
