import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PcInnovationsComponent } from './pc-innovations.component';

const routes: Routes = [
  {
    path:'',
    component: PcInnovationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcInnovationsRoutingModule { }
