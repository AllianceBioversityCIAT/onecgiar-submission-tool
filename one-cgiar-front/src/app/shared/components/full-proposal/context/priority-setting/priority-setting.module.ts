import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrioritySettingRoutingModule } from './priority-setting-routing.module';
import { PrioritySettingComponent } from './priority-setting.component';
import { UtilsModule } from '../../../utils/utils.module';
import { IbdAngularComponentsModule } from '../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PrioritySettingComponent],
  imports: [
    CommonModule,
    PrioritySettingRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrioritySettingModule { }
