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
        loadChildren: () => import('./pages/general-info-f-proposal/general-info-f-proposal.module').then(mod => mod.GeneralInfoFProposalModule),
      },
      {
        path: 'innovation-packages-and-srp',
        loadChildren: () => import('./pages/innovation-packages-and-srp/innovation-packages-and-srp.module').then(mod => mod.InnovationPackagesAndSrpModule),
      },
      {
        path: 'context',
        loadChildren: () => import('./pages/context/context.module').then(mod => mod.ContextModule),
      },
      {
        path: 'work-package-research-plans-and-tocs',
        loadChildren: () => import('./pages/wp-research-plans-and-tocs/wp-research-plans-and-tocs.module').then(mod => mod.WpResearchPlansAndTocsModule),
      },
      {
        path: 'melia',
        loadChildren: () => import('./pages/melia/melia.module').then(mod => mod.MeliaModule),
      },
      {
        path: 'mpara',
        loadChildren: () => import('./pages/mpara/mpara.module').then(mod => mod.MparaModule),
      },
      {
        path: 'human-resources',
        loadChildren: () => import('./pages/human-resources/human-resources.module').then(mod => mod.HumanResourcesModule),
      },
      {
        path: 'financial-resources',
        loadChildren: () => import('./pages/financial-resources/financial-resources.module').then(mod => mod.FinancialResourcesModule),
      },
      {
        path: 'policy-compliance-and-oversight',
        loadChildren: () => import('./pages/policy-compliance-and-oversight/policy-compliance-and-oversight.module').then(mod => mod.PolicyComplianceAndOversightModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullProposalRoutingModule { }
