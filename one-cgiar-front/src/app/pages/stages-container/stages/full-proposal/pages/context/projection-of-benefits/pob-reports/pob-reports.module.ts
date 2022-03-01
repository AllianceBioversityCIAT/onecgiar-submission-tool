import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PobReportsRoutingModule } from './pob-reports-routing.module';
import { PobReportsComponent } from './pob-reports.component';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [PobReportsComponent],
  imports: [
    CommonModule,
    PobReportsRoutingModule,
    UtilsModule,
    ClipboardModule,
    TableModule,
    ButtonModule,
    ToastModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PobReportsModule { }
