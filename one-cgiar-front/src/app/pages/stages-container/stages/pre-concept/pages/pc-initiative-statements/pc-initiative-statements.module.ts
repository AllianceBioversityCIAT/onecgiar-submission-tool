import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcInitiativeStatementsRoutingModule } from './pc-initiative-statements-routing.module';
import { PcInitiativeStatementsComponent } from './pc-initiative-statements.component';
import { PcCommonModulesModule } from '../pc-common-modules.module';

@NgModule({
  declarations: [PcInitiativeStatementsComponent],
  imports: [
    CommonModule,
    PcInitiativeStatementsRoutingModule,
    PcCommonModulesModule
  ]
})
export class PcInitiativeStatementsModule { }
