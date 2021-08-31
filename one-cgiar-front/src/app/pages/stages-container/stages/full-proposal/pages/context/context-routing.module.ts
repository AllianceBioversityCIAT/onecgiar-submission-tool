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
        loadChildren: () => import('./challenge-statement/challenge-statement.module').then(mod => mod.ChallengeStatementModule),
      },
      {
        path: 'comparative-advantage',
        loadChildren: () => import('./comparative-advantage/comparative-advantage.module').then(mod => mod.ComparativeAdvantageModule),
      },
      {
        path: 'learning-fpe-and-ia',
        loadChildren: () => import('./learning-fpe-and-ia/learning-fpe-and-ia.module').then(mod => mod.LearningFpeAndIaModule),
      },
      {
        path: 'measurable-objectives',
        loadChildren: () => import('./measurable-objectives/measurable-objectives.module').then(mod => mod.MeasurableObjectivesModule),
      },
      {
        path: 'participatory-design-process',
        loadChildren: () => import('./participatory-design-process/participatory-design-process.module').then(mod => mod.ParticipatoryDesignProcessModule),
      },
      {
        path: 'priority-setting',
        loadChildren: () => import('./priority-setting/priority-setting.module').then(mod => mod.PrioritySettingModule),
      },
      {
        path: 'projection-of-benefits',
        loadChildren: () => import('./projection-of-benefits/projection-of-benefits.module').then(mod => mod.ProjectionOfBenefitsModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContextRoutingModule { }
