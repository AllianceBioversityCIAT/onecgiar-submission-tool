import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitiativeTeamRoutingModule } from './initiative-team-routing.module';
import { InitiativeTeamComponent } from './initiative-team.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [InitiativeTeamComponent],
  imports: [
    CommonModule,
    InitiativeTeamRoutingModule,
    IbdAngularComponentsModule,
    UtilsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InitiativeTeamModule { }
