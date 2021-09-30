import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapacityDevelopmentRoutingModule } from './capacity-development-routing.module';
import { CapacityDevelopmentComponent } from './capacity-development.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CapacityDevelopmentComponent],
  imports: [
    CommonModule,
    CapacityDevelopmentRoutingModule,
    IbdAngularComponentsModule,
    UtilsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CapacityDevelopmentModule { }
