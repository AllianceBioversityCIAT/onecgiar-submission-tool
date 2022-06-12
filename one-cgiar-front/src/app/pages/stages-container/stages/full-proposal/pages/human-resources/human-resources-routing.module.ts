import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HumanResourcesComponent } from './human-resources.component';

const routes: Routes = [
  {
    path:'',
    component:HumanResourcesComponent,
    children: [
      {
        path: 'capacity-development',
        loadChildren: () => import('./capacity-development/capacity-development.module').then(mod => mod.CapacityDevelopmentModule),
      },
      {
        path: 'gender-diw',
        loadChildren: () => import('./gender-diw/gender-diw.module').then(mod => mod.GenderDiwModule),
      },
      {
        path: 'initiative-team',
        loadChildren: () => import('./initiative-team/initiative-team.module').then(mod => mod.InitiativeTeamModule),
      }
      ,
      {
        path: 'human-resources-reports',
        loadChildren: () => import('./human-resources-reports/human-resources-reports.module').then(mod => mod.HumanResourcesReportsModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanResourcesRoutingModule { }
