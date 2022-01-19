import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopKeyInnovationPoRoutingModule } from './top-key-innovation-po-routing.module';
import { TopKeyInnovationPoComponent } from './top-key-innovation-po.component';
import { PcCommonModulesModule } from '../../../pc-common-modules.module';


@NgModule({
  declarations: [TopKeyInnovationPoComponent],
  imports: [
    CommonModule,
    TopKeyInnovationPoRoutingModule,
    PcCommonModulesModule
  ]
})
export class TopKeyInnovationPoModule { }
