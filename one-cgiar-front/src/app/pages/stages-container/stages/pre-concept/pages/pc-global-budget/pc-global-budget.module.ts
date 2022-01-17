import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcGlobalBudgetRoutingModule } from './pc-global-budget-routing.module';
import { PcGlobalBudgetComponent } from '../pc-global-budget/pc-global-budget.component';


@NgModule({
  declarations: [PcGlobalBudgetComponent],
  imports: [
    CommonModule,
    PcGlobalBudgetRoutingModule
  ]
})
export class PcGlobalBudgetModule { }
