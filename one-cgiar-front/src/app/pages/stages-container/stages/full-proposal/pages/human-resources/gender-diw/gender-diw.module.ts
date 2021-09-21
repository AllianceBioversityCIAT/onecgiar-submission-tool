import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenderDiwRoutingModule } from './gender-diw-routing.module';
import { GenderDiwComponent } from './gender-diw.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GenderDiwComponent],
  imports: [
    CommonModule,
    GenderDiwRoutingModule,    
    IbdAngularComponentsModule,
    UtilsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GenderDiwModule { }
