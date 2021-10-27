import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultFrameworkComponent } from './result-framework.component';

const routes: Routes = [
  {
    path:'',
    component:ResultFrameworkComponent,
    children: [
      {
        path: 'impact-area/:impactAreaID',
        loadChildren: () => import('./re-fre-impact-area/re-fre-impact-area.module').then(mod => mod.ReFreImpactAreaModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultFrameworkRoutingModule { }
