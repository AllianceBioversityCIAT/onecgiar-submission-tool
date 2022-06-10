import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StagesMenuComponent } from './stages-menu.component';
import { UnderConstructionPageComponent } from '../../shared/components/utils/under-construction-page/under-construction-page.component';

const preConceptRoutes = [
  {
    path: 'pre-concept',
    loadChildren: () => import('./stages/pre-concept/pre-concept.module').then(mod => mod.PreConceptModule),
  },
  {
    path: 'pre-concept/general-information',
    loadChildren: () => import('./stages/pre-concept/pages/general-info-pre-concept/general-info-pre-concept.module').then(mod => mod.GeneralInfoPreConceptModule),
  },
  {
    path: 'pre-concept/initial-theory-of-change',
    loadChildren: () => import('./stages/pre-concept/pages/pc-initial-theory-of-change/pc-initial-theory-of-change.module').then(mod => mod.PcInitialTheoryOfChangeModule),
  },
  {
    path: 'pre-concept/initiative-statements',
    loadChildren: () => import('./stages/pre-concept/pages/pc-initiative-statements/pc-initiative-statements.module').then(mod => mod.PcInitiativeStatementsModule),
  },
  {
    path: 'pre-concept/innovations',
    loadChildren: () => import('./stages/pre-concept/pages/pc-innovations/pc-innovations.module').then(mod => mod.PcInnovationsModule),
  },
  {
    path: 'pre-concept/wp-and-geo-focus',
    loadChildren: () => import('./stages/pre-concept/pages/pc-wp-and-geo-focus/pc-wp-and-geo-focus.module').then(mod => mod.PcWpAndGeoFocusModule),
  },
  {
    path: 'pre-concept/key-partners',
    loadChildren: () => import('./stages/pre-concept/pages/pc-key-partners/pc-key-partners.module').then(mod => mod.PcKeyPartnersModule),
  },
  {
    path: 'pre-concept/results',
    loadChildren: () => import('./stages/pre-concept/pages/pc-results/pc-results.module').then(mod => mod.PcResultsModule),
  },
  {
    path: 'pre-concept/global-budget',
    loadChildren: () => import('./stages/pre-concept/pages/pc-global-budget/pc-global-budget.module').then(mod => mod.PcGlobalBudgetModule),
  },
  {
    path: 'under-construction-page',
    component: UnderConstructionPageComponent,
  }
]

const contextRoutes = [
  {
    path: 'context',
    loadChildren: () => import('./stages/full-proposal/pages/context/context.module').then(mod => mod.ContextModule),
  },
  {
    path: 'context/challenge-statement',
    loadChildren: () => import('./stages/full-proposal/pages/context/challenge-statement/challenge-statement.module').then(mod => mod.ChallengeStatementModule),
  },
  {
    path: 'context/comparative-advantage',
    loadChildren: () => import('./stages/full-proposal/pages/context/comparative-advantage/comparative-advantage.module').then(mod => mod.ComparativeAdvantageModule),
  },
  {
    path: 'context/learning-fpe-and-ia',
    loadChildren: () => import('./stages/full-proposal/pages/context/learning-fpe-and-ia/learning-fpe-and-ia.module').then(mod => mod.LearningFpeAndIaModule),
  },
  {
    path: 'context/measurable-objectives',
    loadChildren: () => import('./stages/full-proposal/pages/context/measurable-objectives/measurable-objectives.module').then(mod => mod.MeasurableObjectivesModule),
  },
  {
    path: 'context/participatory-design-process',
    loadChildren: () => import('./stages/full-proposal/pages/context/participatory-design-process/participatory-design-process.module').then(mod => mod.ParticipatoryDesignProcessModule),
  },
  {
    path: 'context/priority-setting',
    loadChildren: () => import('./stages/full-proposal/pages/context/priority-setting/priority-setting.module').then(mod => mod.PrioritySettingModule),
  },
  {
    path: 'context/projection-of-benefits',
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
    loadChildren: () => import('./stages/full-proposal/full-proposal.module').then(mod => mod.FullProposalModule),
  },
  {
    path: 'isdc-feedback-responses',
    loadChildren: () => import('./stages/full-proposal/pages/isdc-feedback-responses/isdc-feedback-responses.module').then(mod => mod.IsdcFeedbackResponsesModule),
  },
  {
    path: 'general-information',
    loadChildren: () => import('./stages/full-proposal/pages/general-info-f-proposal/general-info-f-proposal.module').then(mod => mod.GeneralInfoFProposalModule),
  },
  ...contextRoutes,
  {
    path: 'innovation-packages-and-srp',
    loadChildren: () => import('./stages/full-proposal/pages/innovation-packages-and-srp/innovation-packages-and-srp.module').then(mod => mod.InnovationPackagesAndSrpModule),
  },
  {
    path: 'impact-statements',
    loadChildren: () => import('./stages/full-proposal/pages/impact-statements/impact-statements.module').then(mod => mod.ImpactStatementsModule),
  },
  {
    path: 'work-package-research-plans-and-tocs',
    loadChildren: () => import('./stages/full-proposal/pages/wp-research-plans-and-tocs/wp-research-plans-and-tocs.module').then(mod => mod.WpResearchPlansAndTocsModule),
  },
  {
    path: 'melia',
    loadChildren: () => import('./stages/full-proposal/pages/melia/melia.module').then(mod => mod.MeliaModule),
  },
  {
    path: 'mpara',
    loadChildren: () => import('./stages/full-proposal/pages/mpara/mpara.module').then(mod => mod.MparaModule),
  },
  {
    path: 'human-resources',
    loadChildren: () => import('./stages/full-proposal/pages/human-resources/human-resources.module').then(mod => mod.HumanResourcesModule),
  },
  // {
  //   path: 'financial-resources',
  //   loadChildren: () => import('./stages/full-proposal/pages/financial-resources/financial-resources.module').then(mod => mod.FinancialResourcesModule),
  // },
  {
    path: 'policy-compliance-and-oversight',
    loadChildren: () => import('./stages/full-proposal/pages/policy-compliance-and-oversight/policy-compliance-and-oversight.module').then(mod => mod.PolicyComplianceAndOversightModule),
  },
  {
    path: 'under-construction-page',
    component: UnderConstructionPageComponent,
  }
]

// const fullProposalISDCRoutes = [
//   {
//     path: 'full-proposal-isdc-feedback',
//     loadChildren: () => import('./stages/full-proposal/full-proposal.module').then(mod => mod.FullProposalModule),
//   },
//   {
//     path: 'full-proposal-isdc-feedback/general-information',
//     loadChildren: () => import('./stages/full-proposal/pages/general-info-f-proposal/general-info-f-proposal.module').then(mod => mod.GeneralInfoFProposalModule),
//   },
//   ...contextRoutes,
//   {
//     path: 'full-proposal/innovation-packages-and-srp',
//     loadChildren: () => import('./stages/full-proposal/pages/innovation-packages-and-srp/innovation-packages-and-srp.module').then(mod => mod.InnovationPackagesAndSrpModule),
//   },
//   {
//     path: 'full-proposal/impact-statements',
//     loadChildren: () => import('./stages/full-proposal/pages/impact-statements/impact-statements.module').then(mod => mod.ImpactStatementsModule),
//   },
//   {
//     path: 'full-proposal/work-package-research-plans-and-tocs',
//     loadChildren: () => import('./stages/full-proposal/pages/wp-research-plans-and-tocs/wp-research-plans-and-tocs.module').then(mod => mod.WpResearchPlansAndTocsModule),
//   },
//   {
//     path: 'full-proposal/melia',
//     loadChildren: () => import('./stages/full-proposal/pages/melia/melia.module').then(mod => mod.MeliaModule),
//   },
//   {
//     path: 'full-proposal/mpara',
//     loadChildren: () => import('./stages/full-proposal/pages/mpara/mpara.module').then(mod => mod.MparaModule),
//   },
//   {
//     path: 'full-proposal/human-resources',
//     loadChildren: () => import('./stages/full-proposal/pages/human-resources/human-resources.module').then(mod => mod.HumanResourcesModule),
//   },
//   {
//     path: 'full-proposal/financial-resources',
//     loadChildren: () => import('./stages/full-proposal/pages/financial-resources/financial-resources.module').then(mod => mod.FinancialResourcesModule),
//   },
//   {
//     path: 'full-proposal/policy-compliance-and-oversight',
//     loadChildren: () => import('./stages/full-proposal/pages/policy-compliance-and-oversight/policy-compliance-and-oversight.module').then(mod => mod.PolicyComplianceAndOversightModule),
//   },
//   {
//     path: 'under-construction-page',
//     component: UnderConstructionPageComponent,
//   }
// ]

const routes: Routes = [
  {
    path: '',
    component: StagesMenuComponent,
    children: [
      ...preConceptRoutes,
      ...fullProposalRoutes,
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StagesMenuRoutingModule { }
