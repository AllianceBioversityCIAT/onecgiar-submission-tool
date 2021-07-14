import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenAndFAIRDataAssetsComponent } from './open-and-fair-data-assets.component';

const routes: Routes = [
  {
    path:'',
    component: OpenAndFAIRDataAssetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenAndFAIRDataAssetsRoutingModule { }
