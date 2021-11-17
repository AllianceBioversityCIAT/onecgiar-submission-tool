import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityBreakdownComponent } from './activity-breakdown.component';

const routes: Routes = [
  {
    path:'',
    component:ActivityBreakdownComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityBreakdownRoutingModule { }
