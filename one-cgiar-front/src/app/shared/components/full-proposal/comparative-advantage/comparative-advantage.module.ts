import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComparativeAdvantageRoutingModule } from './comparative-advantage-routing.module';
import { ComparativeAdvantageComponent } from './comparative-advantage.component';


@NgModule({
  declarations: [ComparativeAdvantageComponent],
  imports: [
    CommonModule,
    ComparativeAdvantageRoutingModule
  ]
})
export class ComparativeAdvantageModule { }
