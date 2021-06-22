import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TheoriesOfChangeComponent } from './theories-of-change.component';

const routes: Routes = [
  {
    path:'',
    component: TheoriesOfChangeComponent,
    children:[
      {
        path: 'full-initiative-TOC',
        loadChildren: () => import('../../../../../shared/components/full-proposal/theories-of-change/full-initiative-toc/full-initiative-toc.module').then(mod => mod.FullInitiativeTOCModule),
      },
      {
        path: 'impact-strategies',
        loadChildren: () => import('../../../../../shared/components/full-proposal/theories-of-change/impact-strategies/impact-strategies.module').then(mod => mod.ImpactStrategiesModule),
      },
      {
        path: 'work-package-TOC',
        loadChildren: () => import('../../../../../shared/components/full-proposal/theories-of-change/work-package-toc/work-package-toc.module').then(mod => mod.WorkPackageTOCModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheoriesOfChangeRoutingModule { }
