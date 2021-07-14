import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InnovationPAndScalingRsComponent } from './innovation-p-and-scaling-rs.component';

const routes: Routes = [
  {
    path:'',
    component: InnovationPAndScalingRsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnovationPAndScalingRsRoutingModule { }
