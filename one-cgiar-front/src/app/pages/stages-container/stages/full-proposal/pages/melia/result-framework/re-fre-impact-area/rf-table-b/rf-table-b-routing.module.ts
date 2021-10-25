import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RfTableBComponent } from './rf-table-b.component';

const routes: Routes = [
  {
    path:'',
    component:RfTableBComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfTableBRoutingModule { }
