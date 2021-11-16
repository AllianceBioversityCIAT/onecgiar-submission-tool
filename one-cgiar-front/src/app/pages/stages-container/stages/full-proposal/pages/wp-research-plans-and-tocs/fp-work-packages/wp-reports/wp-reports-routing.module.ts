import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WpReportsComponent } from './wp-reports.component';

const routes: Routes = [
  {
    path:'',
    component:WpReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WpReportsRoutingModule { }
