import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeliaStudiesAndActivitiesComponent } from './melia-studies-and-activities.component';

const routes: Routes = [
  {
    path:'',
    component:MeliaStudiesAndActivitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeliaStudiesAndActivitiesRoutingModule { }
