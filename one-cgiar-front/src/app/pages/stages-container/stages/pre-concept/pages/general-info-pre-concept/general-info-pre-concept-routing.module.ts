import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralInfoPreConceptComponent } from './general-info-pre-concept.component';

const routes: Routes = [
  {
    path:'',
    component:GeneralInfoPreConceptComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralInfoPreConceptRoutingModule { }
