import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsReportsComponent } from './is-reports.component';

const routes: Routes = [
  {
    path:'',
    component:IsReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IsReportsRoutingModule { }
