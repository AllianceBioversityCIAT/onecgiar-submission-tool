import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PcResultsComponent } from './pc-results.component';

const routes: Routes = [
  {
    path:'',
    component: PcResultsComponent,
    children: [
      // {
      //   path: 'pc-impact-areas',
      //   loadChildren: () => import('./melia-plan/melia-plan.module').then(mod => mod.MeliaPlanModule),
      // },
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
