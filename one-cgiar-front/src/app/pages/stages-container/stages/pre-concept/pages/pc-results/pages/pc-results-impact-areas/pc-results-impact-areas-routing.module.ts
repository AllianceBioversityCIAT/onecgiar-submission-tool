import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PcResultsImpactAreasComponent } from './pc-results-impact-areas.component';

const routes: Routes = [
  {
    path:'',
    component:PcResultsImpactAreasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcResultsImpactAreasRoutingModule { }
