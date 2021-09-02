import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FpWorkPackagesComponent } from './fp-work-packages.component';

const routes: Routes = [
  {
    path:'',
    component:FpWorkPackagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FpWorkPackagesRoutingModule { }