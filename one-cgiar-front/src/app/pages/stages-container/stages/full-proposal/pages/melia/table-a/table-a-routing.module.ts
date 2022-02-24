import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableAComponent } from './table-a.component';

const routes: Routes = [
  {
    path:'',
    component:TableAComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableARoutingModule { }
