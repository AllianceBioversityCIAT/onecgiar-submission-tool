import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeliaStudiesAndActivitiesRoutingModule } from './melia-studies-and-activities-routing.module';
import { MeliaStudiesAndActivitiesComponent } from './melia-studies-and-activities.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [MeliaStudiesAndActivitiesComponent],
  imports: [
    CommonModule,
    MeliaStudiesAndActivitiesRoutingModule,
    UtilsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MeliaStudiesAndActivitiesModule { }
