import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiRoutingModule } from './bi-routing.module';
import { BiComponent } from './bi.component';


@NgModule({
  declarations: [BiComponent],
  exports: [BiComponent],
  imports: [
    CommonModule,
    BiRoutingModule
  ]
})
export class BiModule { }
