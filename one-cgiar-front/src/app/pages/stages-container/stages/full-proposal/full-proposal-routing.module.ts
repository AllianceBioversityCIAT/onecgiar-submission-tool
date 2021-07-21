import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullProposalComponent } from './full-proposal.component';
import { ExampleComponent } from '../../../../shared/components/full-proposal/example/example.component';
import { UnderConstructionPageComponent } from '../../../../shared/components/utils/under-construction-page/under-construction-page.component';

const routes: Routes = [
  {
    path: '',
    component: FullProposalComponent,
    children: [
      {
        path: '',
        redirectTo: 'contextd',
        pathMatch: 'full'
      },
      {
        path: 'under-construction-page',
        component: UnderConstructionPageComponent,
      },
      {
        path: 'example',
        component: ExampleComponent,
      },
      {
        path: 'context',
        loadChildren: () => import('./context/context.module').then(mod => mod.ContextModule),
      },
      {
        path: 'management-plans-and-policy-compliance',
        loadChildren: () => import('./management-p-and-policy-c/management-p-and-policy-c.module').then(mod => mod.ManagementPAndPolicyCModule),
      },
      {
        path: 'innovation-packages-and-projection-of-benefits',
        loadChildren: () => import('./innovation-p-and-projection-of-b/innovation-p-and-projection-of-b.module').then(mod => mod.InnovationPAndProjectionOfBModule),
      },
      {
        path: 'work-packages',
        loadChildren: () => import('./fp-work-packages/fp-work-packages.module').then(mod => mod.FpWorkPackagesModule),
      },
      {
        path: 'theories-of-change',
        loadChildren: () => import('./theories-of-change/theories-of-change.module').then(mod => mod.TheoriesOfChangeModule),
      },
      {
        path: 'people-and-culture',
        loadChildren: () => import('./people-and-culture/people-and-culture.module').then(mod => mod.PeopleAndCultureModule),
      },
      {
        path: 'financial-resources',
        loadChildren: () => import('./financial-resources/financial-resources.module').then(mod => mod.FinancialResourcesModule),
      },
      {
        path: 'general-information',
        component: ExampleComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullProposalRoutingModule { }
