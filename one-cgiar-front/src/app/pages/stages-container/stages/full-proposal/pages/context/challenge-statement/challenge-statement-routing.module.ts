import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallengeStatementComponent } from './challenge-statement.component';

const routes: Routes = [
  {
    path:'',
    component:ChallengeStatementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeStatementRoutingModule { }
