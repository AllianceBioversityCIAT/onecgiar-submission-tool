import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InnovationPackagesAndSrpComponent } from './innovation-packages-and-srp.component';

const routes: Routes = [
  {
    path:'',
    component:InnovationPackagesAndSrpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnovationPackagesAndSrpRoutingModule { }
