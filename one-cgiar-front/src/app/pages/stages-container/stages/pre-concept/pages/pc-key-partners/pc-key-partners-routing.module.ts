import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PcKeyPartnersComponent } from './pc-key-partners.component';

const routes: Routes = [
  {
    path:'',
    component: PcKeyPartnersComponent,
    children: [
      {
        path: 'top-key-demand-po',
        loadChildren: () => import('./pages/top-key-demand-po/top-key-demand-po.module').then(mod => mod.TopKeyDemandPoModule),
      },
      {
        path: 'top-key-innovation-po',
        loadChildren: () => import('./pages/top-key-innovation-po/top-key-innovation-po.module').then(mod => mod.TopKeyInnovationPoModule),
      },
      {
        path: 'top-key-scaling-po',
        loadChildren: () => import('./pages/top-key-scaling-po/top-key-scaling-po.module').then(mod => mod.TopKeyScalingPoModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcKeyPartnersRoutingModule { }
