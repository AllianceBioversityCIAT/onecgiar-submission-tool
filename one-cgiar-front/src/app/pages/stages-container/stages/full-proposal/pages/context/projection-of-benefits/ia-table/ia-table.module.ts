import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IaTableRoutingModule } from './ia-table-routing.module';
import { IaTableComponent } from './ia-table.component';
import { TableModule } from 'primeng/table';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [IaTableComponent],
  imports: [
    CommonModule,
    IaTableRoutingModule,
    TableModule,
    UtilsModule
  ]
})
export class IaTableModule { }
