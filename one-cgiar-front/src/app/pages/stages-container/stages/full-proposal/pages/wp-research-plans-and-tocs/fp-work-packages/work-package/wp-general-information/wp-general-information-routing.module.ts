import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WpGeneralInformationComponent } from './wp-general-information.component';

const routes: Routes = [
  {
    path:'',
    component:WpGeneralInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WpGeneralInformationRoutingModule { }
