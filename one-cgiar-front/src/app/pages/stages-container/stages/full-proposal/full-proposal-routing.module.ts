import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullProposalComponent } from './full-proposal.component';
import { ExampleComponent } from '../../../../shared/components/full-proposal/example/example.component';

const routes: Routes = [
  {
    path: '',
    component: FullProposalComponent,
    children: [
      {
        path: '',
        redirectTo: 'example',
        pathMatch: 'full'
      },
      {
        path: 'example',
        component: ExampleComponent,
      },
      {
        path: 'context',
        loadChildren: () => import('./context/context.module').then(mod => mod.ContextModule),

      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullProposalRoutingModule { }
