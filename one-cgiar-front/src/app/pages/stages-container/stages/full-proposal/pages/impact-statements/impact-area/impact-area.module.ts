import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpactAreaRoutingModule } from './impact-area-routing.module';
import { ImpactAreaComponent } from './impact-area.component';


@NgModule({
  declarations: [ImpactAreaComponent],
  imports: [
    CommonModule,
    ImpactAreaRoutingModule
  ]
})
export class ImpactAreaModule { }
