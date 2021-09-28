import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WpResearchPlansAndTocsComponent } from './wp-research-plans-and-tocs.component';

const routes: Routes = [
  {
    path:'',
    component:WpResearchPlansAndTocsComponent,
    children: [
      {
        path: 'work-packages',
        loadChildren: () => import('./fp-work-packages/fp-work-packages.module').then(mod => mod.FpWorkPackagesModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WpResearchPlansAndTocsRoutingModule { }
