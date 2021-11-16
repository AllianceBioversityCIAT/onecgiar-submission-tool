import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsResportsComponent } from './is-resports.component';

const routes: Routes = [
  {
    path:'',
    component:IsResportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IsResportsRoutingModule { }
