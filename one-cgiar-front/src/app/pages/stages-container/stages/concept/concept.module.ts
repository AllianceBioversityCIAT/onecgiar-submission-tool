import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ConceptRoutingModule } from './concept-routing.module';
import { ConceptComponent } from './concept.component';


@NgModule({
  declarations: [
  ConceptComponent],
  imports: [
    CommonModule,
    ConceptRoutingModule
  ]
})
export class ConceptModule { }
