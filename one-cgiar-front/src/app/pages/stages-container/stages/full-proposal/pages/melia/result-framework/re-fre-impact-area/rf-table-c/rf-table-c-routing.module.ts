import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RfTableCComponent } from './rf-table-c.component';

const routes: Routes = [
  {
    path:'',
    component:RfTableCComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfTableCRoutingModule { }
