import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CapacityDevelopmentComponent } from './capacity-development.component';

const routes: Routes = [
  {
    path:'',
    component:CapacityDevelopmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapacityDevelopmentRoutingModule { }
