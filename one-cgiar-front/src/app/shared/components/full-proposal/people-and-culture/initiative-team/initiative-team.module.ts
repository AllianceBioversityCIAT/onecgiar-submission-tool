import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitiativeTeamRoutingModule } from './initiative-team-routing.module';
import { InitiativeTeamComponent } from './initiative-team.component';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [InitiativeTeamComponent],
  imports: [
    CommonModule,
    InitiativeTeamRoutingModule,
    UtilsModule
  ]
})
export class InitiativeTeamModule { }
