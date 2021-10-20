import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WpTocComponent } from './wp-toc.component';

const routes: Routes = [
  {
    path:'',
    component:WpTocComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WpTocRoutingModule { }
