import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleAndCultureComponent } from './people-and-culture.component';

const routes: Routes = [
  {
    path:'',
    component: PeopleAndCultureComponent,
    children:[
      {
        path: 'initiative-Team',
        loadChildren: () => import('../../../../../shared/components/full-proposal/people-and-culture/initiative-team/initiative-team.module').then(mod => mod.InitiativeTeamModule),
      },
      {
        path: 'gender-diversity-inclusion',
        loadChildren: () => import('../../../../../shared/components/full-proposal/people-and-culture/gender-diversity-inclusion/gender-diversity-inclusion.module').then(mod => mod.GenderDiversityInclusionModule),
      },
      {
        path: 'capacity-development',
        loadChildren: () => import('../../../../../shared/components/full-proposal/people-and-culture/capacity-development/capacity-development.module').then(mod => mod.CapacityDevelopmentModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleAndCultureRoutingModule { }
