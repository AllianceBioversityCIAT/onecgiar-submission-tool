import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenAndFairDataAssetsComponent } from './open-and-fair-data-assets.component';

const routes: Routes = [
  {
    path:'',
    component: OpenAndFairDataAssetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenAndFairDataAssetsRoutingModule { }
