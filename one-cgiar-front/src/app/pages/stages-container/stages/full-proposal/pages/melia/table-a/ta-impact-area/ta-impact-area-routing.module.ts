import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaImpactAreaComponent } from './ta-impact-area.component';

const routes: Routes = [
  {
    path:'',
    component: TaImpactAreaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaImpactAreaRoutingModule { }
