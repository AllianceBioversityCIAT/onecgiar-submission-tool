import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IsResportsRoutingModule } from './is-resports-routing.module';
import { IsResportsComponent } from './is-resports.component';
import {TableModule} from 'primeng/table';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [IsResportsComponent],
  imports: [
    CommonModule,
    IsResportsRoutingModule,
    TableModule,
    UtilsModule
  ]
})
export class IsResportsModule { }
