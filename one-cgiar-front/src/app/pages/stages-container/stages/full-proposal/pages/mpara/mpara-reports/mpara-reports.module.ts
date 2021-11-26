import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MparaReportsRoutingModule } from './mpara-reports-routing.module';
import { MparaReportsComponent } from './mpara-reports.component';


@NgModule({
  declarations: [MparaReportsComponent],
  exports:[MparaReportsComponent],
  imports: [
    CommonModule,
    MparaReportsRoutingModule
  ]
})
export class MparaReportsModule { }
