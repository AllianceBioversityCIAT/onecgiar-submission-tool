import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContextComponent } from './context.component';

const routes: Routes = [
  {
    path:'',
    component: ContextComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContextRoutingModule { }
