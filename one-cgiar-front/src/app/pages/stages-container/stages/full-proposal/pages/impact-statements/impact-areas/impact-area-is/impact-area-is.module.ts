import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpactAreaIsRoutingModule } from './impact-area-is-routing.module';
import { ImpactAreaIsComponent } from './impact-area-is.component';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [ImpactAreaIsComponent],
  imports: [
    CommonModule,
    ImpactAreaIsRoutingModule,
    UtilsModule
  ]
})
export class ImpactAreaIsModule { }
