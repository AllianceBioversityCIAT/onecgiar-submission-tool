import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapacityDevelopmentRoutingModule } from './capacity-development-routing.module';
import { CapacityDevelopmentComponent } from './capacity-development.component';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [CapacityDevelopmentComponent],
  imports: [
    CommonModule,
    CapacityDevelopmentRoutingModule,
    UtilsModule
  ]
})
export class CapacityDevelopmentModule { }
