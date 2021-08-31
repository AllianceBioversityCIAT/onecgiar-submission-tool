import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParticipatoryDesignProcessComponent } from './participatory-design-process.component';

const routes: Routes = [
  {
    path:'',
    component:ParticipatoryDesignProcessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipatoryDesignProcessRoutingModule { }
