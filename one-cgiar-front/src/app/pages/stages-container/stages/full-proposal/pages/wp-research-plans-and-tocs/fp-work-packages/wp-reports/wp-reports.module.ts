import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WpReportsRoutingModule } from './wp-reports-routing.module';
import { WpReportsComponent } from './wp-reports.component';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [WpReportsComponent],
  imports: [
    CommonModule,
    WpReportsRoutingModule,
    UtilsModule
  ]
})
export class WpReportsModule { }
