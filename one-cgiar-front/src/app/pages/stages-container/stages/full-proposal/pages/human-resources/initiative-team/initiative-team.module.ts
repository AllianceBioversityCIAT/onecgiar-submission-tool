import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitiativeTeamRoutingModule } from './initiative-team-routing.module';
import { InitiativeTeamComponent } from './initiative-team.component';


@NgModule({
  declarations: [InitiativeTeamComponent],
  imports: [
    CommonModule,
    InitiativeTeamRoutingModule
  ]
})
export class InitiativeTeamModule { }
