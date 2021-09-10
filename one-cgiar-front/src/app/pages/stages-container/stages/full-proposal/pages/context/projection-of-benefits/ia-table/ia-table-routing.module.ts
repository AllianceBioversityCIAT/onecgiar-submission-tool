import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IaTableComponent } from './ia-table.component';

const routes: Routes = [
  {
    path:'',
    component:IaTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IaTableRoutingModule { }
