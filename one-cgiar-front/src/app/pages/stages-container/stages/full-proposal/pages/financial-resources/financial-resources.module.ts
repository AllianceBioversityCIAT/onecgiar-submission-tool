import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialResourcesRoutingModule } from './financial-resources-routing.module';
import { FinancialResourcesComponent } from './financial-resources.component';


@NgModule({
  declarations: [FinancialResourcesComponent],
  imports: [
    CommonModule,
    FinancialResourcesRoutingModule
  ]
})
export class FinancialResourcesModule { }
