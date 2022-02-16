import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PcInitiativeStatementsComponent } from './pc-initiative-statements.component';

const routes: Routes = [
  {
    path:'',
    component: PcInitiativeStatementsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcInitiativeStatementsRoutingModule { }
