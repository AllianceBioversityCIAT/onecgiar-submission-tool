import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrioritySettingRoutingModule } from './priority-setting-routing.module';
import { PrioritySettingComponent } from './priority-setting.component';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [PrioritySettingComponent],
  imports: [
    CommonModule,
    PrioritySettingRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrioritySettingModule { }
