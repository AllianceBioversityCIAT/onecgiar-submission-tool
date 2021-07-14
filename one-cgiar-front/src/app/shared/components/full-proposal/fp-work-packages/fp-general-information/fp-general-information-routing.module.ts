import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FpGeneralInformationComponent } from './fp-general-information.component';

const routes: Routes = [
  {
    path:'',
    component:FpGeneralInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FpGeneralInformationRoutingModule { }
