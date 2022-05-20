import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpactAreasComponent } from './impact-areas.component';

const routes: Routes = [
  {
    path:'',
    component: ImpactAreasComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./impact-statements-table/impact-statements-table.module').then(mod => mod.ImpactStatementsTableModule),
      },
      {
        path: 'impact-area/:iaID',
        loadChildren: () => import('./impact-area-is/impact-area-is.module').then(mod => mod.ImpactAreaIsModule),
      },
      {
        path: 'partners-no-impact-area',
        loadChildren: () => import('./partners-no-impact-area/partners-no-impact-area.module').then(mod => mod.PartnersNoImpactAreaModule),
      },
      {
        path: 'is-reports',
        loadChildren: () => import('./../is-reports/is-reports.module').then(mod => mod.IsReportsModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpactAreasRoutingModule { }
// impact-statements-table
// impact-area