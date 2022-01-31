import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralInfoConceptComponent } from './general-info-concept.component';

const routes: Routes = [
  {
    path:'',
    component:GeneralInfoConceptComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralInfoConceptRoutingModule { }
