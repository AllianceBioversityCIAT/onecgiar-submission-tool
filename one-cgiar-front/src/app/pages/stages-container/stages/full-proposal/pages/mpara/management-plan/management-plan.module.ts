import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementPlanRoutingModule } from './management-plan-routing.module';
import { ManagementPlanComponent } from './management-plan.component';
import { UtilsModule } from '@app/shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from '../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
// import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
