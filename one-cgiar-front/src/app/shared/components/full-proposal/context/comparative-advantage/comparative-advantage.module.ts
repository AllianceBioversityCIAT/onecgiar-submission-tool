import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComparativeAdvantageRoutingModule } from './comparative-advantage-routing.module';
import { ComparativeAdvantageComponent } from './comparative-advantage.component';
import { MaterialModule } from '../../../../../material.module';
import { CustomFormsModule } from '../../../custom-forms/custom-forms.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [ComparativeAdvantageComponent],
  imports: [
    CommonModule,
    ComparativeAdvantageRoutingModule,
    MaterialModule,
    CustomFormsModule,
    ReactiveFormsModule,
    FormsModule,
    UtilsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComparativeAdvantageModule { }
