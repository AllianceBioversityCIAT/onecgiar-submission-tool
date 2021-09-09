import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultFrameworkComponent } from './result-framework.component';

const routes: Routes = [
  {
    path:'',
    component:ResultFrameworkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultFrameworkRoutingModule { }
