import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetComponent } from './budget.component';

const routes: Routes = [
  {
    path: '',
    // component: BudgetComponent,
    children: [
      {
        path: 'activity-breakdown',
        loadChildren: () => import('./activity-breakdown/activity-breakdown.module').then(mod => mod.ActivityBreakdownModule),
      },
      {
        path: 'geography-breakdown',
        loadChildren: () => import('./geography-breakdown/geography-breakdown.module').then(mod => mod.GeographyBreakdownModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
