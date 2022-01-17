import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PcWpAndGeoFocusComponent } from './pc-wp-and-geo-focus.component';

const routes: Routes = [
  {
    path:'',
    component: PcWpAndGeoFocusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcWpAndGeoFocusRoutingModule { }
