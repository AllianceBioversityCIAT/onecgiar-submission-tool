import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WpsTableComponent } from './wps-table.component';

const routes: Routes = [
  {
    path:'',
    component:WpsTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WpsTableRoutingModule { }
