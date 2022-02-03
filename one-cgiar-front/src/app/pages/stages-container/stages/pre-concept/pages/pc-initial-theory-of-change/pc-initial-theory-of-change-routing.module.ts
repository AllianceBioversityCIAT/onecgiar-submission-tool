import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PcInitialTheoryOfChangeComponent } from './pc-initial-theory-of-change.component';

const routes: Routes = [
  {
    path:'',
    component: PcInitialTheoryOfChangeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcInitialTheoryOfChangeRoutingModule { }
