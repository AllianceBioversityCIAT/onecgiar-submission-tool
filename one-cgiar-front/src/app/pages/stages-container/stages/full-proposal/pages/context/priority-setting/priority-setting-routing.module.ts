import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrioritySettingComponent } from './priority-setting.component';

const routes: Routes = [
  {
    path:'',
    component:PrioritySettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrioritySettingRoutingModule { }
