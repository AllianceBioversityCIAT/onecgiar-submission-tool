import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PobResportsRoutingModule } from './pob-resports-routing.module';
import { PobResportsComponent } from './pob-resports.component';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [PobResportsComponent],
  imports: [
    CommonModule,
    PobResportsRoutingModule,
    UtilsModule,
    ClipboardModule,
    TableModule,
    ButtonModule,
    ToastModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PobResportsModule { }
