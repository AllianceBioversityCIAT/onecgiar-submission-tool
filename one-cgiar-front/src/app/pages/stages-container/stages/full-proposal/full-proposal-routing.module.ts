import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullProposalComponent } from './full-proposal.component';
import { UnderConstructionPageComponent } from '../../../../shared/components/utils/under-construction-page/under-construction-page.component';

const routes: Routes = [
  {
    path: '',
    component: FullProposalComponent,
    children: [
      {
        path: '',
        redirectTo: 'general-information',
        pathMatch: 'full'
      },
      {
        path: 'under-construction-page',
        component: UnderConstructionPageComponent,
      },
      {
        path: 'general-information',
        loadChildren: () => import('./general-info-f-proposal/general-info-f-proposal.module').then(mod => mod.GeneralInfoFProposalModule),
      },
      {
        path: 'context',
        loadChildren: () => import('./context/context.module').then(mod => mod.ContextModule),
      },
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
export class FullProposalRoutingModule { }
