import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnersNoImpactAreaComponent } from './partners-no-impact-area.component';

const routes: Routes = [
  {
    path:'',
    component:PartnersNoImpactAreaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersNoImpactAreaRoutingModule { }
