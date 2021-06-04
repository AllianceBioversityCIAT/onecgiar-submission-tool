import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallengeStatementRoutingModule } from './challenge-statement-routing.module';
import { ChallengeStatementComponent } from './challenge-statement.component';
import { MaterialModule } from '../../../../material.module';
import { CustomFormsModule } from '../../custom-forms/custom-forms.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [ChallengeStatementComponent],
  imports: [
    CommonModule,
    ChallengeStatementRoutingModule,
    MaterialModule,
    CustomFormsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChallengeStatementModule { }
