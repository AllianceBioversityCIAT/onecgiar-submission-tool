import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PobResportsComponent } from './pob-resports.component';

const routes: Routes = [
  {
    path:'',
    component:PobResportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PobResportsRoutingModule { }
