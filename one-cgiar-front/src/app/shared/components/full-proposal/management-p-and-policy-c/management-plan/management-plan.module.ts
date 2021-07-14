import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementPlanRoutingModule } from './management-plan-routing.module';
import { ManagementPlanComponent } from './management-plan.component';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [ManagementPlanComponent],
  imports: [
    CommonModule,
    ManagementPlanRoutingModule,
    UtilsModule
  ]
})
export class ManagementPlanModule { }
