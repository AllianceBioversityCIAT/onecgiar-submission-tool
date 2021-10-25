import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReFreImpactAreaComponent } from './re-fre-impact-area.component';

const routes: Routes = [
  {
    path:'',
    component:ReFreImpactAreaComponent,
    children: [
      {
        path: 'table-a',
        loadChildren: () => import('./rf-table-a/rf-table-a.module').then(mod => mod.RfTableAModule),
      },
      {
        path: 'table-b',
        loadChildren: () => import('./rf-table-b/rf-table-b.module').then(mod => mod.RfTableBModule),
      },
      {
        path: 'table-c',
        loadChildren: () => import('./rf-table-c/rf-table-c.module').then(mod => mod.RfTableCModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReFreImpactAreaRoutingModule { }
