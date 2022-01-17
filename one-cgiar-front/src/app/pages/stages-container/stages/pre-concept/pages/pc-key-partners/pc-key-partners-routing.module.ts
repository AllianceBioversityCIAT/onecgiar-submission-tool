import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PcKeyPartnersComponent } from './pc-key-partners.component';

const routes: Routes = [
  {
    path:'',
    component: PcKeyPartnersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcKeyPartnersRoutingModule { }
