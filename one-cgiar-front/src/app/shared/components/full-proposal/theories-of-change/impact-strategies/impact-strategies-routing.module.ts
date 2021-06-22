import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpactStrategiesComponent } from './impact-strategies.component';

const routes: Routes = [
  {
    path:'',
    component: ImpactStrategiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpactStrategiesRoutingModule { }
