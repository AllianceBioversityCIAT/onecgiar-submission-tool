import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralInfoPreConceptRoutingModule } from './general-info-pre-concept-routing.module';
import { GeneralInfoPreConceptComponent } from './general-info-pre-concept.component';


@NgModule({
  declarations: [GeneralInfoPreConceptComponent],
  imports: [
    CommonModule,
    GeneralInfoPreConceptRoutingModule
  ]
})
export class GeneralInfoPreConceptModule { }
