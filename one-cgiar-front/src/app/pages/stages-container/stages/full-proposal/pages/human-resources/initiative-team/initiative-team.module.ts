import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitiativeTeamRoutingModule } from './initiative-team-routing.module';
import { InitiativeTeamComponent } from './initiative-team.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InitiativeTeamItemModule } from './components/initiative-team-item/initiative-team-item.module';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [InitiativeTeamComponent],
  imports: [
    CommonModule,
    InitiativeTeamRoutingModule,
    IbdAngularComponentsModule,
    UtilsModule,
    FormsModule,
    ReactiveFormsModule,
    InitiativeTeamItemModule,
    ButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InitiativeTeamModule { }
