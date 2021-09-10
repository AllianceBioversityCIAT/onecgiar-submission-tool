import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpactAreaComponent } from './impact-area.component';

const routes: Routes = [
  {
    path:'',
    component:ImpactAreaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpactAreaRoutingModule { }
