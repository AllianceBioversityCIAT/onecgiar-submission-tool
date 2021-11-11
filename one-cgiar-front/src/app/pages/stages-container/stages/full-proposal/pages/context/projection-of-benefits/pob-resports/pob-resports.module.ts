import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PobResportsRoutingModule } from './pob-resports-routing.module';
import { PobResportsComponent } from './pob-resports.component';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [PobResportsComponent],
  imports: [
    CommonModule,
    PobResportsRoutingModule,
    UtilsModule
  ]
})
export class PobResportsModule { }
