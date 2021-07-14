import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FpBudgetRoutingModule } from './fp-budget-routing.module';
import { FpBudgetComponent } from './fp-budget.component';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [FpBudgetComponent],
  imports: [
    CommonModule,
    FpBudgetRoutingModule,
    UtilsModule
  ]
})
export class FpBudgetModule { }
