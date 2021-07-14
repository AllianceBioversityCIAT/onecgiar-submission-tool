import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitiativeTeamComponent } from './initiative-team.component';

const routes: Routes = [
  {
    path:'',
    component:InitiativeTeamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitiativeTeamRoutingModule { }
