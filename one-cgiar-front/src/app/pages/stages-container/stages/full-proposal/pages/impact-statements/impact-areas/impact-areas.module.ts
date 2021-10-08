import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpactAreasRoutingModule } from './impact-areas-routing.module';
import { ImpactAreasComponent } from './impact-areas.component';


@NgModule({
  declarations: [ImpactAreasComponent],
  imports: [
    CommonModule,
    ImpactAreasRoutingModule
  ]
})
export class ImpactAreasModule { }
