import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EthicsRoutingModule } from './ethics-routing.module';
import { EthicsComponent } from './ethics.component';


@NgModule({
  declarations: [EthicsComponent],
  imports: [
    CommonModule,
    EthicsRoutingModule
  ]
})
export class EthicsModule { }
