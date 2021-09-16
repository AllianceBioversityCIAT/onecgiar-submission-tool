import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FpWorkPackageComponent } from './fp-work-package.component';

const routes: Routes = [
  {
    path:'',
    component:FpWorkPackageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FpWorkPackageRoutingModule { }
