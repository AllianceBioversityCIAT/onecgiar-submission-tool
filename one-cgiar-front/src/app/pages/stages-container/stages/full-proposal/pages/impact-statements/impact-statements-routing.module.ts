import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpactStatementsComponent } from './impact-statements.component';

const routes: Routes = [
  {
    path:'',
    component: ImpactStatementsComponent,
    children: [
      {
        path: 'impact-statements-table',
        loadChildren: () => import('./impact-statements-table/impact-statements-table.module').then(mod => mod.ImpactStatementsTableModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpactStatementsRoutingModule { }
