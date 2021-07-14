import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContextComponent } from './context.component';

const routes: Routes = [
  {
    path:'',
    component: ContextComponent,
    children: [
      {
        path: 'challenge-statement',
        loadChildren: () => import('../../../../../shared/components/full-proposal/context/challenge-statement/challenge-statement.module').then(mod => mod.ChallengeStatementModule),
      },
      {
        path: 'comparative-advantage',
        loadChildren: () => import('../../../../../shared/components/full-proposal/context/comparative-advantage/comparative-advantage.module').then(mod => mod.ComparativeAdvantageModule),
      },
      {
        path: 'learning-fpe-and-ia',
        loadChildren: () => import('../../../../../shared/components/full-proposal/context/learning-fpe-and-ia/learning-fpe-and-ia.module').then(mod => mod.LearningFpeAndIaModule),
      },
      {
        path: 'measurable-objectives',
        loadChildren: () => import('../../../../../shared/components/full-proposal/context/measurable-objectives/measurable-objectives.module').then(mod => mod.MeasurableObjectivesModule),
      },
      {
        path: 'participatory-design-process',
        loadChildren: () => import('../../../../../shared/components/full-proposal/context/participatory-design-process/participatory-design-process.module').then(mod => mod.ParticipatoryDesignProcessModule),
      },
      {
        path: 'priority-setting',
        loadChildren: () => import('../../../../../shared/components/full-proposal/context/priority-setting/priority-setting.module').then(mod => mod.PrioritySettingModule),
      },
      {
        path: 'projection-of-benefits',
        loadChildren: () => import('../../../../../shared/components/full-proposal/context/projection-of-benefits/projection-of-benefits.module').then(mod => mod.ProjectionOfBenefitsModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContextRoutingModule { }
