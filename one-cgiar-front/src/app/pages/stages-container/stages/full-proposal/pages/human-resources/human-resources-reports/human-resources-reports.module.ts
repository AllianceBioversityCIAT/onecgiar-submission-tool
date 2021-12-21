import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HumanResourcesReportsRoutingModule } from './human-resources-reports-routing.module';
import { HumanResourcesReportsComponent } from './human-resources-reports.component';
import { UtilsModule } from '@app/shared/components/utils/utils.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { StagesPipesModule } from '@app/pages/stages-container/stages/shared/pipes/stages-pipes.module';


@NgModule({
  declarations: [HumanResourcesReportsComponent],
  imports: [
    CommonModule,
    HumanResourcesReportsRoutingModule,
    UtilsModule,
    ButtonModule,
    TableModule,
    StagesPipesModule
  ]
})
export class HumanResourcesReportsModule { }
