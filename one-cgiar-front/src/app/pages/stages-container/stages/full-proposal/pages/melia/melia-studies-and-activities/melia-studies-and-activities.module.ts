import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeliaStudiesAndActivitiesRoutingModule } from './melia-studies-and-activities-routing.module';
import { MeliaStudiesAndActivitiesComponent } from './melia-studies-and-activities.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MeliaStudiesAndActivitiesComponent],
  imports: [
    CommonModule,
    MeliaStudiesAndActivitiesRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MeliaStudiesAndActivitiesModule { }
