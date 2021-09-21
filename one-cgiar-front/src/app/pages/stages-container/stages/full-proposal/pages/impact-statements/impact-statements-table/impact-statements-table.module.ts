import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpactStatementsTableRoutingModule } from './impact-statements-table-routing.module';
import { ImpactStatementsTableComponent } from './impact-statements-table.component';


@NgModule({
  declarations: [ImpactStatementsTableComponent],
  imports: [
    CommonModule,
    ImpactStatementsTableRoutingModule
  ]
})
export class ImpactStatementsTableModule { }
