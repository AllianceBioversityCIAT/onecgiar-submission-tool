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
        loadChildren: () => import('../../../../../shared/components/full-proposal/challenge-statement/challenge-statement.module').then(mod => mod.ChallengeStatementModule),
      },
      {
        path: 'comparative-advantage',
        loadChildren: () => import('../../../../../shared/components/full-proposal/comparative-advantage/comparative-advantage.module').then(mod => mod.ComparativeAdvantageModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContextRoutingModule { }
