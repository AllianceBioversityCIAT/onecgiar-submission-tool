import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementPlanRoutingModule } from './management-plan-routing.module';
import { ManagementPlanComponent } from './management-plan.component';


@NgModule({
  declarations: [ManagementPlanComponent],
  imports: [
    CommonModule,
    ManagementPlanRoutingModule
  ]
})
export class ManagementPlanModule { }
