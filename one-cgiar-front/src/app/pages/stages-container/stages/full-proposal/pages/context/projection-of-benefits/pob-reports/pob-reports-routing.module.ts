import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PobReportsComponent } from './pob-reports.component';

const routes: Routes = [
  {
    path:'',
    component:PobReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PobReportsRoutingModule { }
