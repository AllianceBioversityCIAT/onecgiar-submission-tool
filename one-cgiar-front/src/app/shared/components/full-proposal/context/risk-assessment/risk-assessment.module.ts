import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskAssessmentRoutingModule } from './risk-assessment-routing.module';
import { RiskAssessmentComponent } from './risk-assessment.component';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [RiskAssessmentComponent],
  imports: [
    CommonModule,
    RiskAssessmentRoutingModule,
    UtilsModule
  ]
})
export class RiskAssessmentModule { }
