import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PcWorkPackageComponent } from './pc-work-package.component';

const routes: Routes = [
  {
    path:'',
    component:PcWorkPackageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcWorkPackageRoutingModule { }
