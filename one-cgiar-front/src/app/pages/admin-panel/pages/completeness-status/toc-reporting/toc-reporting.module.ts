import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {ProgressBarModule} from 'primeng/progressbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

import { TocReportingRoutingModule } from './toc-reporting-routing.module';
import { TocReportingComponent } from './toc-reporting.component';
import { UtilsModule } from '../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [TocReportingComponent],
  exports: [TocReportingComponent],
  imports: [
    CommonModule,
    TocReportingRoutingModule,
    TableModule,
    ProgressBarModule,
    ButtonModule,
    InputTextModule,
    UtilsModule
  ]
})
export class TocReportingModule { }
