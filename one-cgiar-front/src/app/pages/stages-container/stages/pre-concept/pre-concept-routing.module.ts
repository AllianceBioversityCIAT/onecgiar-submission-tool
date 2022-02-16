import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreConceptComponent } from './pre-concept.component';

const routes: Routes = [
  {
    path:'',
    component:PreConceptComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreConceptRoutingModule { }
