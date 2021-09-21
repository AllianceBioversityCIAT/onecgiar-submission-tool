import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenderDiwComponent } from './gender-diw.component';

const routes: Routes = [
  {
    path:'',
    component:GenderDiwComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenderDiwRoutingModule { }
