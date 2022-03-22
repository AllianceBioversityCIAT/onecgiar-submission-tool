import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableCComponent } from './table-c.component';

const routes: Routes = [
  {
    path:'',
    component:TableCComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableCRoutingModule { }
