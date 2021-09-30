import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpactStatementsTableComponent } from './impact-statements-table.component';

const routes: Routes = [
  {
    path:'',
    component: ImpactStatementsTableComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpactStatementsTableRoutingModule { }
