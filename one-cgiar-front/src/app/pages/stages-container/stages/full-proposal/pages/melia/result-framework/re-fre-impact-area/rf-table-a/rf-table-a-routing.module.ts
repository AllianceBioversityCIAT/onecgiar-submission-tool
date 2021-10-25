import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RfTableAComponent } from './rf-table-a.component';

const routes: Routes = [
  {
    path:'',
    component:RfTableAComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfTableARoutingModule { }
