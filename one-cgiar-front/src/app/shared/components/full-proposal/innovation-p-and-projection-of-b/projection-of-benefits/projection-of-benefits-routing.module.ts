import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectionOfBenefitsComponent } from './projection-of-benefits.component';

const routes: Routes = [
    {
    path:'',
    component: ProjectionOfBenefitsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectionOfBenefitsRoutingModule { }
