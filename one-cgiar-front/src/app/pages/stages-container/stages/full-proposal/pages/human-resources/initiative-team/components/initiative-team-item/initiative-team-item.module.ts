import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitiativeTeamItemComponent } from './initiative-team-item.component';
// import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { IbdAngularComponentsModule } from '../../../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { FormsModule } from '@angular/forms';
import { ButtonEditOrDeleteModule } from '../../../../../../shared/components/button-edit-or-delete/button-edit-or-delete.module';



@NgModule({
  declarations: [InitiativeTeamItemComponent],
  exports:[InitiativeTeamItemComponent],
  imports: [
    CommonModule,
    IbdAngularComponentsModule,
    FormsModule,
    ButtonEditOrDeleteModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InitiativeTeamItemModule { }
