import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeographyBreakdownComponent } from './geography-breakdown.component';

const routes: Routes = [
  {
    path:'',
    component:GeographyBreakdownComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeographyBreakdownRoutingModule { }
