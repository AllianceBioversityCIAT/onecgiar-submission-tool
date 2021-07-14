import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EthicsRoutingModule } from './ethics-routing.module';
import { EthicsComponent } from './ethics.component';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [EthicsComponent],
  imports: [
    CommonModule,
    EthicsRoutingModule,
    UtilsModule
  ]
})
export class EthicsModule { }
