import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkPackageTOCComponent } from './work-package-toc.component';

const routes: Routes = [
  {
    path:'',
    component: WorkPackageTOCComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkPackageTOCRoutingModule { }
