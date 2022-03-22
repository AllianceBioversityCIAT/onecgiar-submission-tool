import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcWpTableRoutingModule } from './pc-wp-table-routing.module';
import { PcWpTableComponent } from './pc-wp-table.component';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';
import { TableModule } from 'primeng/table';
import { PctablecompModule } from './components/pctablecomp/pctablecomp.module';


@NgModule({
  declarations: [PcWpTableComponent],
  imports: [
    CommonModule,
    PcWpTableRoutingModule,
    UtilsModule,
    PctablecompModule
  ]
})
export class PcWpTableModule { }
