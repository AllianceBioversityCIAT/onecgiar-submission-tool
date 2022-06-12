import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MparaComponent } from './mpara.component';

const routes: Routes = [
  {
    path:'',
    component: MparaComponent,
    children: [
      {
        path: 'smpg-table',
        loadChildren: () => import('./smpg-table/smpg-table.module').then(mod => mod.SmpgTableModule),
      },
      {
        path: 'risk-assessment',
        loadChildren: () => import('./risk-assessment/risk-assessment.module').then(mod => mod.RiskAssessmentModule),
      },
      {
        path: 'management-plan',
        loadChildren: () => import('./management-plan/management-plan.module').then(mod => mod.ManagementPlanModule),
      },
      {
        path: 'mpara-reports',
        loadChildren: () => import('./mpara-reports/mpara-reports.module').then(mod => mod.MparaReportsModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MparaRoutingModule { }
