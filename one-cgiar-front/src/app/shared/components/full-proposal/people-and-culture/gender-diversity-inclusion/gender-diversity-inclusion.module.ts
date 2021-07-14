import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenderDiversityInclusionRoutingModule } from './gender-diversity-inclusion-routing.module';
import { GenderDiversityInclusionComponent } from './gender-diversity-inclusion.component';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [GenderDiversityInclusionComponent],
  imports: [
    CommonModule,
    GenderDiversityInclusionRoutingModule,
    UtilsModule
  ]
})
export class GenderDiversityInclusionModule { }
