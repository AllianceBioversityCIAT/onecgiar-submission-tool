import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralInfoFProposalComponent } from './general-info-f-proposal.component';

const routes: Routes = [
  {
    path:'',
    component:GeneralInfoFProposalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralInfoFProposalRoutingModule { }
