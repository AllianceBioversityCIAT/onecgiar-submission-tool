import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcInitialTheoryOfChangeRoutingModule } from './pc-initial-theory-of-change-routing.module';
import { PcInitialTheoryOfChangeComponent } from './pc-initial-theory-of-change.component';
import { PcCommonModulesModule } from '../pc-common-modules.module';


@NgModule({
  declarations: [PcInitialTheoryOfChangeComponent],
  imports: [
    CommonModule,
    PcInitialTheoryOfChangeRoutingModule,
    PcCommonModulesModule
  ]
})
export class PcInitialTheoryOfChangeModule { }
