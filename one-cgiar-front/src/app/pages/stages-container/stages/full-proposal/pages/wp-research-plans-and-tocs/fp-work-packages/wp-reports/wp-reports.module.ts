import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WpReportsRoutingModule } from './wp-reports-routing.module';
import { WpReportsComponent } from './wp-reports.component';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';
import { CountriesTableModule } from './components/countries-table/countries-table.module';
import { RegionsTableModule } from './components/regions-table/regions-table.module';


@NgModule({
  declarations: [WpReportsComponent],
  imports: [
    CommonModule,
    WpReportsRoutingModule,
    UtilsModule,
    CountriesTableModule,
    RegionsTableModule
  ]
})
export class WpReportsModule { }
