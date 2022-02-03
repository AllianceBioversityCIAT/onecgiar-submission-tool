import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreConceptRoutingModule } from './pre-concept-routing.module';
import { PreConceptComponent } from './pre-concept.component';


@NgModule({
  declarations: [PreConceptComponent],
  imports: [
    CommonModule,
    PreConceptRoutingModule
  ]
})
export class PreConceptModule { }
