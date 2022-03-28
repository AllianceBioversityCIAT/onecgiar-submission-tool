import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeliaStudiesAndActivitiesRoutingModule } from './melia-studies-and-activities-routing.module';
import { MeliaStudiesAndActivitiesComponent } from './melia-studies-and-activities.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompactInformationTableViewModule } from '../../../../../../../shared/components/compact-information-table-view/compact-information-table-view.module';
import { CollapsibleContainerModule } from '../../../../../../../shared/components/collapsible-container/collapsible-container.module';

@NgModule({
  declarations: [MeliaStudiesAndActivitiesComponent],
  imports: [
    CommonModule,
    MeliaStudiesAndActivitiesRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    CompactInformationTableViewModule,
    CollapsibleContainerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MeliaStudiesAndActivitiesModule { }
