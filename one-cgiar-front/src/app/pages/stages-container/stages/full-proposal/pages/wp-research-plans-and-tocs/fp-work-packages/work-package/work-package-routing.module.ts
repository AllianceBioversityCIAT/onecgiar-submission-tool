import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkPackageComponent } from './work-package.component';

const routes: Routes = [
  {
    path:'',
    component:WorkPackageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkPackageRoutingModule { }
