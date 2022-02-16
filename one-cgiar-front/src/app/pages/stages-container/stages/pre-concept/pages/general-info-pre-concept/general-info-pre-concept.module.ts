import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralInfoPreConceptRoutingModule } from './general-info-pre-concept-routing.module';
import { GeneralInfoPreConceptComponent } from './general-info-pre-concept.component';
import { GeneralInformationModule } from '../../../shared/components/general-information/general-information.module';


@NgModule({
  declarations: [GeneralInfoPreConceptComponent],
  imports: [
    CommonModule,
    GeneralInfoPreConceptRoutingModule,
    GeneralInformationModule
  ]
})
export class GeneralInfoPreConceptModule { }
