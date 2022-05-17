import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IsReportsRoutingModule } from './is-reports-routing.module';
import { IsReportsComponent } from './is-reports.component';
import {TableModule} from 'primeng/table';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import {ButtonModule} from 'primeng/button';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { StagesPipesModule } from '../../../../shared/pipes/stages-pipes.module';


@NgModule({
  declarations: [IsReportsComponent],
  imports: [
    CommonModule,
    IsReportsRoutingModule,
    TableModule,
    UtilsModule,
    ButtonModule,
    ClipboardModule,
    StagesPipesModule,
    IbdAngularComponentsModule
  ]
})
export class IsReportsModule { }
