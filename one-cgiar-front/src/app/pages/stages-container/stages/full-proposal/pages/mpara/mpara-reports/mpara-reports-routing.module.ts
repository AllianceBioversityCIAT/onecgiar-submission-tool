import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MparaReportsComponent } from './mpara-reports.component';

const routes: Routes = [
  {
    path:'',
    component: MparaReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MparaReportsRoutingModule { }
