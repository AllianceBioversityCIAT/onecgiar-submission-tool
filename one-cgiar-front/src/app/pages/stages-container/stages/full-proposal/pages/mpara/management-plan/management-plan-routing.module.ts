import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementPlanComponent } from './management-plan.component';

const routes: Routes = [
  {
    path:'',
    component:ManagementPlanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementPlanRoutingModule { }
