import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopKeyScalingPoComponent } from './top-key-scaling-po.component';

const routes: Routes = [
  {
    path:'',
    component:TopKeyScalingPoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopKeyScalingPoRoutingModule { }
