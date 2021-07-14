import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullInitiativeTOCComponent } from './full-initiative-toc.component';

const routes: Routes = [
  {
    path:'',
    component: FullInitiativeTOCComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullInitiativeTOCRoutingModule { }
