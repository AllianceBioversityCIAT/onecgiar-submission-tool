import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskAssessmentItemComponent } from './risk-assessment-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';

import { ButtonModule } from 'primeng/button';
import { OpportunityItemModule } from '../opportunity-item/opportunity-item.module';
import { ButtonEditOrDeleteModule } from '../../../../../../shared/components/button-edit-or-delete/button-edit-or-delete.module';



@NgModule({
  declarations: [RiskAssessmentItemComponent],
  exports: [
    RiskAssessmentItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IbdAngularComponentsModule,
    ButtonModule,
    OpportunityItemModule,
    ButtonEditOrDeleteModule
  ]

})
export class RiskAssessmentItemModule { }
