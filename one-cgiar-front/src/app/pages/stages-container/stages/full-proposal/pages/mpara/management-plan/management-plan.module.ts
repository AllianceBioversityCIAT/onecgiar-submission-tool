import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementPlanRoutingModule } from './management-plan-routing.module';
import { ManagementPlanComponent } from './management-plan.component';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';

@NgModule({
  declarations: [ManagementPlanComponent],
  imports: [
    CommonModule,
    ManagementPlanRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ManagementPlanModule { }
