import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PobImpactAreaComponent } from './pob-impact-area.component';

const routes: Routes = [
  {
    path:'',
    component:PobImpactAreaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PobImpactAreaRoutingModule { }
