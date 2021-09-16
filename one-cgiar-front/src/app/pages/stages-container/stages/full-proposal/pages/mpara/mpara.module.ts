import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MparaRoutingModule } from './mpara-routing.module';
import { MparaComponent } from './mpara.component';
import { SmpgTableComponent } from './smpg-table/smpg-table.component';


@NgModule({
  declarations: [MparaComponent],
  imports: [
    CommonModule,
    MparaRoutingModule
  ]
})
export class MparaModule { }
