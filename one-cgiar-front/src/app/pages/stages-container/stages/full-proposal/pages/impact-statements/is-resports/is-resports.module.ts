import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IsResportsRoutingModule } from './is-resports-routing.module';
import { IsResportsComponent } from './is-resports.component';


@NgModule({
  declarations: [IsResportsComponent],
  imports: [
    CommonModule,
    IsResportsRoutingModule
  ]
})
export class IsResportsModule { }
