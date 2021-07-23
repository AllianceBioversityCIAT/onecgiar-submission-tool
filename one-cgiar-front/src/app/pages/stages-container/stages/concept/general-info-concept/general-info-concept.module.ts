import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralInfoConceptRoutingModule } from './general-info-concept-routing.module';
import { GeneralInfoConceptComponent } from './general-info-concept.component';
import { GeneralInformationModule } from '../../../../../shared/components/general-information/general-information.module';


@NgModule({
  declarations: [GeneralInfoConceptComponent],
  imports: [
    CommonModule,
    GeneralInfoConceptRoutingModule,
    GeneralInformationModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneralInfoConceptModule { }
