import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeliaPlanRoutingModule } from './melia-plan-routing.module';
import { MeliaPlanComponent } from './melia-plan.component';


@NgModule({
  declarations: [MeliaPlanComponent],
  imports: [
    CommonModule,
    MeliaPlanRoutingModule
  ]
})
export class MeliaPlanModule { }
