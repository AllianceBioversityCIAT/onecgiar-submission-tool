import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskAssessmentRoutingModule } from './risk-assessment-routing.module';
import { RiskAssessmentComponent } from './risk-assessment.component';
import { UtilsModule } from '@app/shared/components/utils/utils.module';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomSteperModule } from '../../../../shared/components/custom-steper/custom-steper.module';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepTwoComponent } from './components/step-two/step-two.component';
import {ButtonModule} from 'primeng/button';
import { RiskAssessmentItemModule } from './components/risk-assessment-item/risk-assessment-item.module';
import { ButtonAddElementModule } from '../../../../shared/components/button-add-element/button-add-element.module';

@NgModule({
  declarations: [RiskAssessmentComponent, StepOneComponent, StepTwoComponent],
  imports: [
    CommonModule,
    RiskAssessmentRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RiskAssessmentItemModule,
    ButtonAddElementModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RiskAssessmentModule { }
