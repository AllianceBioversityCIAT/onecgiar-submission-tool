import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpactStatementsComponent } from './impact-statements.component';

const routes: Routes = [
  {
    path:'',
    component: ImpactStatementsComponent,
    children: [
      {
        path: 'impact-areas',
        loadChildren: () => import('./impact-areas/impact-areas.module').then(mod => mod.ImpactAreasModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpactStatementsRoutingModule { }
