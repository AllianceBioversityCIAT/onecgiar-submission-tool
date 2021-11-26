import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MparaComponent } from '../mpara.component';

const routes: Routes = [
  {
    path:'',
    component: MparaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MparaReportsRoutingModule { }
