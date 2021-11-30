import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MparaReportsRoutingModule } from './mpara-reports-routing.module';
import { MparaReportsComponent } from './mpara-reports.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [MparaReportsComponent],
  exports:[MparaReportsComponent],
  imports: [
    CommonModule,
    MparaReportsRoutingModule,
    UtilsModule,
    TableModule,
    ButtonModule
  ]
})
export class MparaReportsModule { }
