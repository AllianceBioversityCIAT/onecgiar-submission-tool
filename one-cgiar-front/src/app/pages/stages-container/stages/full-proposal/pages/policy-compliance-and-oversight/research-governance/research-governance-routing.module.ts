import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResearchGovernanceComponent } from './research-governance.component';

const routes: Routes = [
  {
    path:'',
    component: ResearchGovernanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResearchGovernanceRoutingModule { }
