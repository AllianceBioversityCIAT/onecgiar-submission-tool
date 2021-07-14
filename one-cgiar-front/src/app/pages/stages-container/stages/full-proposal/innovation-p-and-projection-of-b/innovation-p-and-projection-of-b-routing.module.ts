import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InnovationPAndProjectionOfBComponent } from './innovation-p-and-projection-of-b.component';

const routes: Routes = [
  {
    path:'',
    component:InnovationPAndProjectionOfBComponent,
    children: [
      {
        path: 'innovation-packages-and-scaling-readiness-strategy',
        loadChildren: () => import('../../../../../shared/components/full-proposal/innovation-p-and-projection-of-b/innovation-p-and-scaling-rs/innovation-p-and-scaling-rs.module').then(mod => mod.InnovationPAndScalingRsModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnovationPAndProjectionOfBRoutingModule { }
