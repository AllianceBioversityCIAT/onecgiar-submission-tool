import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SdgMappingComponent } from './sdg-mapping.component';

const routes: Routes = [
  {
    path:'',
    component:SdgMappingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SdgMappingRoutingModule { }
