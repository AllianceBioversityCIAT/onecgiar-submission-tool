import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WpsTableRoutingModule } from './wps-table-routing.module';
import { WpsTableComponent } from './wps-table.component';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [WpsTableComponent],
  imports: [
    CommonModule,
    WpsTableRoutingModule,
    UtilsModule,
    TableModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class WpsTableModule { }
