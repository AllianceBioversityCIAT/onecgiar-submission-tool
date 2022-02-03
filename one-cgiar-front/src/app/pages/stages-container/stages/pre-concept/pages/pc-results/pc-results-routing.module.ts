import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PcResultsComponent } from './pc-results.component';

const routes: Routes = [
  {
    path:'',
    component: PcResultsComponent,
    children: [
      {
        path: 'impact-areas/impact-area/:id',
        loadChildren: () => import('./pages/pc-results-impact-areas/pc-results-impact-areas.module').then(mod => mod.PcResultsImpactAreasModule),
      },
      {
        path: 'sdg-mapping',
        loadChildren: () => import('./pages/sdg-mapping/sdg-mapping.module').then(mod => mod.SdgMappingModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcResultsRoutingModule { }
