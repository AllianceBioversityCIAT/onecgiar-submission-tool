import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsdcStatusComponent } from './isdc-status.component';

const routes: Routes = [{path:'',component:IsdcStatusComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IsdcStatusRoutingModule { }
