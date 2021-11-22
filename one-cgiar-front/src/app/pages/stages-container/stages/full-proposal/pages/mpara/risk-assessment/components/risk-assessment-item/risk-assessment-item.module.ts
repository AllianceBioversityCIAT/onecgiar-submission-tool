import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskAssessmentItemComponent } from './risk-assessment-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IbdAngularComponentsModule } from 'ibd-angular-components';



@NgModule({
  declarations: [RiskAssessmentItemComponent],
  exports: [
    RiskAssessmentItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IbdAngularComponentsModule
  ]

})
export class RiskAssessmentItemModule { }
