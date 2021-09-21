import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpactStatementsTableRoutingModule } from './impact-statements-table-routing.module';
import { ImpactStatementsTableComponent } from './impact-statements-table.component';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [ImpactStatementsTableComponent],
  imports: [
    CommonModule,
    ImpactStatementsTableRoutingModule,
    UtilsModule
  ]
})
export class ImpactStatementsTableModule { }
