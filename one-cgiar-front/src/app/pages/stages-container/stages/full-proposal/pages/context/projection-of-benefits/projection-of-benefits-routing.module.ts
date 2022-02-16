import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectionOfBenefitsComponent } from './projection-of-benefits.component';

const routes: Routes = [
    {
    path:'',
    component: ProjectionOfBenefitsComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./ia-table/ia-table.module').then(mod => mod.IaTableModule),
      },
      {
        path: 'impact-area/:pobIaID',
        loadChildren: () => import('./impact-area/impact-area.module').then(mod => mod.ImpactAreaModule),
      },
      {
        path: 'pob-reports',
        loadChildren: () => import('./pob-reports/pob-reports.module').then(mod => mod.PobReportsModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectionOfBenefitsRoutingModule { }
