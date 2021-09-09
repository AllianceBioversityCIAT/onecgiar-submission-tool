import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeliaStudiesAndActivitiesRoutingModule } from './melia-studies-and-activities-routing.module';
import { MeliaStudiesAndActivitiesComponent } from './melia-studies-and-activities.component';


@NgModule({
  declarations: [MeliaStudiesAndActivitiesComponent],
  imports: [
    CommonModule,
    MeliaStudiesAndActivitiesRoutingModule
  ]
})
export class MeliaStudiesAndActivitiesModule { }
