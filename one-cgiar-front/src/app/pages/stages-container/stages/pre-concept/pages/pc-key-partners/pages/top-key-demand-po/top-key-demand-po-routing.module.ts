import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopKeyDemandPoComponent } from './top-key-demand-po.component';

const routes: Routes = [
  {
    path:'',
    component:TopKeyDemandPoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopKeyDemandPoRoutingModule { }
