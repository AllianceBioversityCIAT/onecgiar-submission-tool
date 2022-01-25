import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcInnovationsRoutingModule } from './pc-innovations-routing.module';
import { PcInnovationsComponent } from './pc-innovations.component';
import { PcCommonModulesModule } from '../pc-common-modules.module';
import { ButtonEditOrDeleteModule } from '../../../shared/components/button-edit-or-delete/button-edit-or-delete.module';


@NgModule({
  declarations: [PcInnovationsComponent],
  imports: [
    CommonModule,
    PcInnovationsRoutingModule,
    PcCommonModulesModule,
    ButtonEditOrDeleteModule
  ]
})
export class PcInnovationsModule { }
