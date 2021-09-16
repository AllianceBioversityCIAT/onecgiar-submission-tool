import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmpgTableComponent } from './smpg-table.component';

const routes: Routes = [
  {
    path:'',
    component:SmpgTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmpgTableRoutingModule { }
