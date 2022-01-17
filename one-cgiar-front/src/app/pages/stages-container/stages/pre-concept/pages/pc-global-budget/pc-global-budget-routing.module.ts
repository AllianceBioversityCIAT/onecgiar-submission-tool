import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PcGlobalBudgetComponent } from './pc-global-budget.component';

const routes: Routes = [
  {
    path:'',
    component: PcGlobalBudgetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcGlobalBudgetRoutingModule { }
