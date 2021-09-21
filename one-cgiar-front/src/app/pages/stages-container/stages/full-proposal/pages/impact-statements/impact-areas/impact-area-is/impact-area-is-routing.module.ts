import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpactAreaIsComponent } from './impact-area-is.component';

const routes: Routes = [
  {
    path:'',
    component:ImpactAreaIsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpactAreaIsRoutingModule { }
