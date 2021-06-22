import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FpBudgetComponent } from './fp-budget.component';

const routes: Routes = [
  {
    path:'',
    component: FpBudgetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FpBudgetRoutingModule { }
