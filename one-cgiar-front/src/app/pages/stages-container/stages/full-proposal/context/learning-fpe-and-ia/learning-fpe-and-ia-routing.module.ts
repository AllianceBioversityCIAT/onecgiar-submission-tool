import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearningFpeAndIaComponent } from './learning-fpe-and-ia.component';

const routes: Routes = [
  {
    path:'',
    component:LearningFpeAndIaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningFpeAndIaRoutingModule { }
