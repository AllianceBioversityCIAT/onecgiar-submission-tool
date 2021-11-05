import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityBreakdownRoutingModule } from './activity-breakdown-routing.module';
import { ActivityBreakdownComponent } from './activity-breakdown.component';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ActivityBreakdownComponent],
  imports: [
    CommonModule,
    ActivityBreakdownRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule
  ]
})
export class ActivityBreakdownModule { }
