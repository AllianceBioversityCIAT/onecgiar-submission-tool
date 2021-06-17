import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskAssessmentRoutingModule } from './risk-assessment-routing.module';
import { RiskAssessmentComponent } from './risk-assessment.component';


@NgModule({
  declarations: [RiskAssessmentComponent],
  imports: [
    CommonModule,
    RiskAssessmentRoutingModule
  ]
})
export class RiskAssessmentModule { }
