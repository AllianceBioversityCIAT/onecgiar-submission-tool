import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ConceptRoutingModule } from './concept-routing.module';
import { ConceptComponent } from './concept.component';
import { MaterialModule } from '../../../../material.module';


@NgModule({
  declarations: [ConceptComponent],
  imports: [
    CommonModule,
    ConceptRoutingModule,
    MaterialModule,
  ]
})
export class ConceptModule { }
