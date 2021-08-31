import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComparativeAdvantageComponent } from './comparative-advantage.component';

const routes: Routes = [
  {
    path:'',
    component:ComparativeAdvantageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComparativeAdvantageRoutingModule { }
