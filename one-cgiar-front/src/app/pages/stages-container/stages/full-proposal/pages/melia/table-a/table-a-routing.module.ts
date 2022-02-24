import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableAComponent } from './table-a.component';

const routes: Routes = [
  {
    path:'',
    component:TableAComponent,
    children:[
      { path: 'impact-area/:id', loadChildren: () => import('./ta-impact-area/ta-impact-area.module').then(m => m.TaImpactAreaModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableARoutingModule { }
