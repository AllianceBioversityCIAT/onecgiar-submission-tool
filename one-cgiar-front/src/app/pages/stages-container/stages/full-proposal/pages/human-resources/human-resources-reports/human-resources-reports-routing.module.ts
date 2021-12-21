import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HumanResourcesReportsComponent } from './human-resources-reports.component';

const routes: Routes = [
  {
    path:'',
    component:HumanResourcesReportsComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanResourcesReportsRoutingModule { }
