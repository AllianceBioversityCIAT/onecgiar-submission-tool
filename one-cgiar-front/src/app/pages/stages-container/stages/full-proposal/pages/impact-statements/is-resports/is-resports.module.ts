import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IsResportsRoutingModule } from './is-resports-routing.module';
import { IsResportsComponent } from './is-resports.component';
import {TableModule} from 'primeng/table';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import {ButtonModule} from 'primeng/button';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { StagesPipesModule } from '../../../../shared/pipes/stages-pipes.module';


@NgModule({
  declarations: [IsResportsComponent],
  imports: [
    CommonModule,
    IsResportsRoutingModule,
    TableModule,
    UtilsModule,
    ButtonModule,
    ClipboardModule,
    StagesPipesModule
  ]
})
export class IsResportsModule { }
