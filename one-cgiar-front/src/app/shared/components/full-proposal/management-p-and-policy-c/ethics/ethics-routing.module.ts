import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EthicsComponent } from './ethics.component';

const routes: Routes = [
  {
    path:'',
    component: EthicsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EthicsRoutingModule { }
