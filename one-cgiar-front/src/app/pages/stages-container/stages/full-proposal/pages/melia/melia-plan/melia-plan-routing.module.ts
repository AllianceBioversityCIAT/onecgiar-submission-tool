import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeliaPlanComponent } from './melia-plan.component';

const routes: Routes = [
  {
    path:'',
    component:MeliaPlanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeliaPlanRoutingModule { }
