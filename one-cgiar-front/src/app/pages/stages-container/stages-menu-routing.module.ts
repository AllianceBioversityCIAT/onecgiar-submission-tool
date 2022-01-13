import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StagesMenuComponent } from './stages-menu.component';
import { UnderConstructionPageComponent } from '../../shared/components/utils/under-construction-page/under-construction-page.component';

/////////////////////////////////
//////Full proposal routing//////
////////////////////////////////

const contextRoutes = [
  {
    path: 'full-proposal/context',
    loadChildren: () => import('./stages/full-proposal/pages/context/context.module').then(mod => mod.ContextModule),
  },
  {
    path: 'full-proposal/context/challenge-statement',
    loadChildren: () => import('./stages/full-proposal/pages/context/challenge-statement/challenge-statement.module').then(mod => mod.ChallengeStatementModule),
  },
  {
    path: 'full-proposal/context/comparative-advantage',
    loadChildren: () => import('./stages/full-proposal/pages/context/comparative-advantage/comparative-advantage.module').then(mod => mod.ComparativeAdvantageModule),
  },
  {
    path: 'full-proposal/context/learning-fpe-and-ia',
    loadChildren: () => import('./stages/full-proposal/pages/context/learning-fpe-and-ia/learning-fpe-and-ia.module').then(mod => mod.LearningFpeAndIaModule),
  },
  {
    path: 'full-proposal/context/measurable-objectives',
    loadChildren: () => import('./stages/full-proposal/pages/context/measurable-objectives/measurable-objectives.module').then(mod => mod.MeasurableObjectivesModule),
  },
  {
    path: 'full-proposal/context/participatory-design-process',
    loadChildren: () => import('./stages/full-proposal/pages/context/participatory-design-process/participatory-design-process.module').then(mod => mod.ParticipatoryDesignProcessModule),
  },
  {
    path: 'full-proposal/context/priority-setting',
    loadChildren: () => import('./stages/full-proposal/pages/context/priority-setting/priority-setting.module').then(mod => mod.PrioritySettingModule),
  },
  {
    path: 'full-proposal/context/projection-of-benefits',
    loadChildren: () => import('./stages/full-proposal/pages/context/projection-of-benefits/projection-of-benefits.module').then(mod => mod.ProjectionOfBenefitsModule),
  },
  // {
  //   path: 'impact-area',
  //   loadChildren: () => import('./pob-impact-area/pob-impact-area.module').then(mod => mod.PobImpactAreaModule),
  // }
]

const fullProposalRoutes = [
  {
    path: '',
    redirectTo: 'full-proposal/general-information',
    pathMatch: 'full'
  },
  {
    path: 'full-proposal',
    loadChildren: () => import('./stages/full-proposal/full-proposal.module').then(mod => mod.FullProposalModule),
  },
  {
    path: 'full-proposal/general-information',
    loadChildren: () => import('./stages/full-proposal/pages/general-info-f-proposal/general-info-f-proposal.module').then(mod => mod.GeneralInfoFProposalModule),
  },
  ...contextRoutes,
  {
    path: 'full-proposal/innovation-packages-and-srp',
    loadChildren: () => import('./stages/full-proposal/pages/innovation-packages-and-srp/innovation-packages-and-srp.module').then(mod => mod.InnovationPackagesAndSrpModule),
  },
  {
    path: 'full-proposal/impact-statements',
    loadChildren: () => import('./stages/full-proposal/pages/impact-statements/impact-statements.module').then(mod => mod.ImpactStatementsModule),
  },
  {
    path: 'full-proposal/work-package-research-plans-and-tocs',
    loadChildren: () => import('./stages/full-proposal/pages/wp-research-plans-and-tocs/wp-research-plans-and-tocs.module').then(mod => mod.WpResearchPlansAndTocsModule),
  },
  {
    path: 'full-proposal/melia',
    loadChildren: () => import('./stages/full-proposal/pages/melia/melia.module').then(mod => mod.MeliaModule),
  },
  {
    path: 'full-proposal/mpara',
    loadChildren: () => import('./stages/full-proposal/pages/mpara/mpara.module').then(mod => mod.MparaModule),
  },
  {
    path: 'full-proposal/human-resources',
    loadChildren: () => import('./stages/full-proposal/pages/human-resources/human-resources.module').then(mod => mod.HumanResourcesModule),
  },
  {
    path: 'full-proposal/financial-resources',
    loadChildren: () => import('./stages/full-proposal/pages/financial-resources/financial-resources.module').then(mod => mod.FinancialResourcesModule),
  },
  {
    path: 'full-proposal/policy-compliance-and-oversight',
    loadChildren: () => import('./stages/full-proposal/pages/policy-compliance-and-oversight/policy-compliance-and-oversight.module').then(mod => mod.PolicyComplianceAndOversightModule),
  },
  {
    path: 'under-construction-page',
    component: UnderConstructionPageComponent,
  }
]



const routes: Routes = [
  {
    path: '',
    component: StagesMenuComponent,
    children: [
      {
        path: 'concept',
        loadChildren: () => import('./stages/concept/concept.module').then(mod => mod.ConceptModule),
      },
      ...fullProposalRoutes
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StagesMenuRoutingModule { }
