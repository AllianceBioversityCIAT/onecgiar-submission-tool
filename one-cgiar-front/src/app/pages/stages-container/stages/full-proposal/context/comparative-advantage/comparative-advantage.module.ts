import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComparativeAdvantageRoutingModule } from './comparative-advantage-routing.module';
import { ComparativeAdvantageComponent } from './comparative-advantage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { CustomFormsModule } from '@app/shared/components/custom-forms/custom-forms.module';
import { UtilsModule } from '@app/shared/components/utils/utils.module';
// import { IbdAngularComponentsModule } from '../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [ComparativeAdvantageComponent],
  imports: [
    CommonModule,
    ComparativeAdvantageRoutingModule,
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
export class ComparativeAdvantageModule { }
