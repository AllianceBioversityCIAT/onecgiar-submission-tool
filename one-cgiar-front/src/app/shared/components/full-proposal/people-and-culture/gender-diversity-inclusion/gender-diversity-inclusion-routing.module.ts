import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenderDiversityInclusionComponent } from './gender-diversity-inclusion.component';

const routes: Routes = [
  {
    path:'',
    component:GenderDiversityInclusionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenderDiversityInclusionRoutingModule { }
