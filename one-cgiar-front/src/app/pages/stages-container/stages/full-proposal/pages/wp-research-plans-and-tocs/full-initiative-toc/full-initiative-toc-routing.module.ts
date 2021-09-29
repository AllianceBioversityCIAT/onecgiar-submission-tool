import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullInitiativeTocComponent } from './full-initiative-toc.component';

const routes: Routes = [
  {
    path:'',
    component: FullInitiativeTocComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullInitiativeTocRoutingModule { }
