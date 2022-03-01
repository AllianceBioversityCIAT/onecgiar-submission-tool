import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PcWpTableComponent } from './pc-wp-table.component';

const routes: Routes = [
  {
    path:'',
    component: PcWpTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcWpTableRoutingModule { }
