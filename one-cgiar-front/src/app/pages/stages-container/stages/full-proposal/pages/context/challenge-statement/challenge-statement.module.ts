import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallengeStatementRoutingModule } from './challenge-statement-routing.module';
import { ChallengeStatementComponent } from './challenge-statement.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IbdAngularComponentsModule } from '../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
// import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '@app/material.module';
import { CustomFormsModule } from '@app/shared/components/custom-forms/custom-forms.module';
import { UtilsModule } from '@app/shared/components/utils/utils.module';
@NgModule({
  declarations: [ChallengeStatementComponent],
  imports: [
    CommonModule,
    ChallengeStatementRoutingModule,
    MaterialModule,
    CustomFormsModule,
    ReactiveFormsModule,
    FormsModule,
    UtilsModule,
    IbdAngularComponentsModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChallengeStatementModule { }
