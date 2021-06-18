import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrioritySettingRoutingModule } from './priority-setting-routing.module';
import { PrioritySettingComponent } from './priority-setting.component';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [PrioritySettingComponent],
  imports: [
    CommonModule,
    PrioritySettingRoutingModule,
    UtilsModule
  ]
})
export class PrioritySettingModule { }
