import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PobResportsRoutingModule } from './pob-resports-routing.module';
import { PobResportsComponent } from './pob-resports.component';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [PobResportsComponent],
  imports: [
    CommonModule,
    PobResportsRoutingModule,
    UtilsModule,
    ClipboardModule,
    TableModule,
    ButtonModule
  ]
})
export class PobResportsModule { }
