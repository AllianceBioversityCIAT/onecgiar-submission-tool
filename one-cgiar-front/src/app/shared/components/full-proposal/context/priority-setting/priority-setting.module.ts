import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrioritySettingRoutingModule } from './priority-setting-routing.module';
import { PrioritySettingComponent } from './priority-setting.component';


@NgModule({
  declarations: [PrioritySettingComponent],
  imports: [
    CommonModule,
    PrioritySettingRoutingModule
  ]
})
export class PrioritySettingModule { }
