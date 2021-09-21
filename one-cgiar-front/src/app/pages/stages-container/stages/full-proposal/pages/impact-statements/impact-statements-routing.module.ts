import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpactStatementsComponent } from './impact-statements.component';

const routes: Routes = [
  {
    path:'',
    component: ImpactStatementsComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./impact-statements-table/impact-statements-table.module').then(mod => mod.ImpactStatementsTableModule),
      },
      {
        path: 'impact-area/:iaID',
        loadChildren: () => import('./impact-area/impact-area.module').then(mod => mod.ImpactAreaModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpactStatementsRoutingModule { }
