import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HumanResourcesComponent } from './human-resources.component';

const routes: Routes = [
  {
    path:'',
    component:HumanResourcesComponent,
    // children: [
    //   {
    //     path: 'budget',
    //     loadChildren: () => import('./budget/budget.module').then(mod => mod.BudgetModule),
    //   }
    // ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanResourcesRoutingModule { }
